/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package messages;

import conexion.consultas;
import messages.getsms;
import java.io.IOException;
import java.net.URISyntaxException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;

/**
 *
 * @author wladi
 */
@ServerEndpoint("/endpoint")
public class websocketsms {

    private static final List<Session> conectados = new ArrayList<>();
    private static final Collection<JSONObject> sessionesJSON = new ArrayList<JSONObject>();
    private static boolean open = false;

    @OnOpen
    public void nuevo(Session amig) {
        conectados.add(amig);
        open = true;
        System.out.println("sesion reciente:" + amig.getId());
    }

    public String addnamsession(Session se, String name) {
        JSONObject cuerpo = new JSONObject();
        cuerpo.put("user", name);
        cuerpo.put("id", se.getId());
        JSONObject head = new JSONObject();
        head.put("session", cuerpo);
        return head.toString();
    }

    public void deleteusers(Session se) {
        JSONObject json = new JSONObject();
        JSONObject json1 = new JSONObject();
        Iterator<JSONObject> iterator = sessionesJSON.iterator();
        while (iterator.hasNext()) {
            json = iterator.next();
            System.out.println("value= " + json);
            System.out.println("value= " + json.get("session"));
            json1 = (JSONObject) json.get("session");
            if (json1.get("id").toString().equals(se.getId())) {
                iterator.remove();
            }
        }
    }

    public JSONObject getuser(Session s) {
        JSONObject json = new JSONObject();
        JSONObject json1 = new JSONObject();
        JSONObject envio = new JSONObject();
        ArrayList<String> names = new ArrayList<String>();
        Iterator<JSONObject> iterator = sessionesJSON.iterator();
        while (iterator.hasNext()) {
            json = iterator.next();
            json1 = (JSONObject) json.get("session");
            if (!json1.getString("id").equals(s.getId())) {
                names.add(json1.getString("user"));
            }
        }
        envio.put("users", names.toArray());
        return envio;
    }

    public String getsessionvalidate(String username) {
        JSONObject json = new JSONObject();
        JSONObject json1 = new JSONObject();
        Iterator<JSONObject> iterator = sessionesJSON.iterator();
        while (iterator.hasNext()) {
            json = iterator.next();
            json1 = (JSONObject) json.get("session");
            if (json1.getString("user").equals(username)) {
                return json1.getString("id");
            }
        }
        return "";
    }

    public JSONObject sendmessage(int idreceiver, int idsend, String tipo) throws IOException, URISyntaxException {

        getsms g = new getsms();
        JSONObject cuerpo = new JSONObject();
        JSONObject send = new JSONObject();
        if (tipo.equals("returnrecibe")) {
            cuerpo.put("mychatallfriend", chatsfriend(idreceiver, idsend));
            cuerpo.put("chatfriend", g.getchatfriends(idreceiver));
            cuerpo.put("idrec", idsend);
        } else {
            cuerpo.put("mychatallfriend", chatsfriend(idsend, idreceiver));
            cuerpo.put("chatfriend", g.getchatfriends(idsend));
            cuerpo.put("idrec", idreceiver);
        }
        send.put(tipo, cuerpo);

        return send;
    }

    public void addsesions(Session se, String name) {
        JSONObject cuerpo = new JSONObject(addnamsession(se, name));
        sessionesJSON.add(cuerpo);
    }

    @OnClose
    public void onClose(Session amig) {
        deleteusers(amig);
        conectados.remove(amig);
    }

    public JSONObject sendopen(String message, Session cliente) throws IOException, URISyntaxException {
        JSONObject cuerpo = new JSONObject();

        consultas c = new consultas();
        getsms g = new getsms();
        String nameuser = c.getuser("select \"USER\" from users where iduser='" + message + "'").trim();
        addsesions(cliente, nameuser);
        cuerpo.put("myinfo", nameuser);
        try {
            cuerpo.put("mychatinfo", g.getchatfriends(Integer.valueOf(message)));
        } catch (IOException ex) {
            Logger.getLogger(websocketsms.class.getName()).log(Level.SEVERE, null, ex);
        } catch (URISyntaxException ex) {
            Logger.getLogger(websocketsms.class.getName()).log(Level.SEVERE, null, ex);
        }

        return cuerpo;
    }

    public JSONObject chatsfriend(int myid, int idfriend) throws IOException, URISyntaxException {
        getsms g = new getsms();

        return g.getsmss(myid, idfriend);
    }

    public JSONObject returnnewchat(String sms) {
        JSONObject data = new JSONObject();
        consultas c = new consultas();
        ResultSet sql = c.any_query("select iduser,\"USER\" from users where \"USER\" like '%" + sms + "%'");
        List<String> lis = new ArrayList<>();
        try {
            JSONArray nsms = new JSONArray();

            while (sql.next()) {
                lis.add(sql.getString(1));
                lis.add(sql.getString(2));
                nsms.put(lis);
                lis.clear();
            }
            data.put("returnbusco", nsms);

        } catch (SQLException ex) {
            Logger.getLogger(websocketsms.class
                    .getName()).log(Level.SEVERE, null, ex);
        }
        return data;
    }

    public JSONObject newfriendhcat(String j) {
        consultas c = new consultas();
        JSONObject data = new JSONObject();
        List<String> lis = new ArrayList<>();

        ResultSet sql = c.any_query("select u.iduser,u.\"USER\",concat(TRIM(p.first_name),' ',TRIM(p.last_name)) namess,'' sms,to_char(p.fnaciimi, 'YYYY-MM-DD')AS fecha,\n"
                + "'' hora, p.address,p.email,p.phone\n"
                + "from peoples p inner join users u on u.idperson=p.idperson\n"
                + "where u.iduser=" + j);
        JSONArray nsms = new JSONArray();

        try {
            while (sql.next()) {
                lis.add(sql.getString(1).trim());
                lis.add(sql.getString(2).trim());
                lis.add(sql.getString(3).trim());
                lis.add(sql.getString(4).trim());
                lis.add(sql.getString(5).trim());
                lis.add(sql.getString(6).trim());
                lis.add(sql.getString(7).trim());
                lis.add(sql.getString(8).trim());
                lis.add(sql.getString(9).trim());
                nsms.put(lis);
                lis.clear();
            }
            data.put("newfriendhcat", nsms);

        } catch (SQLException ex) {
            Logger.getLogger(websocketsms.class
                    .getName()).log(Level.SEVERE, null, ex);
        }
        return data;
    }

    @OnMessage
    public void onMessage(String message, Session cliente) throws URISyntaxException {
        try {
            System.out.println(cliente.getId());
            System.out.println("mensaje recibido:  " + message);
            if (open) {
                open = false;
                sendmessagemychat(cliente, message);
            } else {
                JSONObject obj = new JSONObject(message);
                if (obj.has("chatfriend")) {
                    obj = obj.getJSONObject("chatfriend");
                    sendmessagemychatfriend(Integer.valueOf(obj.getString("myuser")), Integer.valueOf(obj.getString("idfriend")), cliente);
                } else if (obj.has("chatsend")) {
                    obj = obj.getJSONObject("chatsend");
                    System.out.println(obj.toString());
                    sms(Integer.valueOf(obj.getString("iduser")), Integer.valueOf(obj.getString("idsend")), obj.getString("message"),
                            obj.getString("username"),obj.getString("usersend") ,cliente, "save");
                } else if (obj.has("datobusco")) {
                    obj = obj.getJSONObject("datobusco");
                    cliente.getBasicRemote().sendObject(returnnewchat(obj.getString("data")));
                } else if (obj.has("chatfriendnew")) {
                    obj = obj.getJSONObject("chatfriendnew");
                    cliente.getBasicRemote().sendObject(newfriendhcat(obj.getString("idfriend")));
                } else if (obj.has("deletesms")) {
                    obj = obj.getJSONObject("deletesms");
                    consultas c = new consultas();
                    c.any_query("SELECT public.removesms(" + obj.getString("idsms") + "," + Integer.valueOf(obj.getString("myuser")) + ")");
                    cliente.getBasicRemote().sendObject(newfriendhcat(obj.getString("idfriend")));
                } else {
                    for (Session con : conectados) {
                        con.getBasicRemote().sendObject(message);
                    }
                }
            }
        } catch (IOException ex) {

        } catch (EncodeException ex) {

        }
    }

    public void respondertomy(Session sesion, JSONObject objetorecibido) throws EncodeException, IOException {
        sesion.getBasicRemote().sendObject(objetorecibido);
    }

    public void sendmessagemychat(Session sesion, String objetorecibido) throws IOException, URISyntaxException {
        Thread hilo = new Thread(() -> {
            JSONObject cuerpo = new JSONObject();
            try {
                consultas c = new consultas();
                getsms g = new getsms();
                String nameuser = c.getuser("select \"USER\" from users where iduser='" + objetorecibido + "'").trim();
                addsesions(sesion, nameuser);
                cuerpo.put("myinfo", nameuser);
                cuerpo.put("mychatinfo", g.getchatfriends(Integer.valueOf(objetorecibido)));
                respondertomy(sesion, cuerpo);
            } catch (IOException ex) {
                Logger.getLogger(websocketsms.class.getName()).log(Level.SEVERE, null, ex);
            } catch (URISyntaxException ex) {
                Logger.getLogger(websocketsms.class.getName()).log(Level.SEVERE, null, ex);
            } catch (EncodeException ex) {
                Logger.getLogger(websocketsms.class.getName()).log(Level.SEVERE, null, ex);
            }
        });
        hilo.start();
    }

    public void sendmessagemychatfriend(int myid, int friendid, Session sesion) {
        Thread hilo = new Thread(() -> {
            getsms g = new getsms();

            try {
                respondertomy(sesion, g.getsmss(myid, friendid));

            } catch (IOException ex) {
                Logger.getLogger(websocketsms.class.getName()).log(Level.SEVERE, null, ex);
            } catch (URISyntaxException ex) {
                Logger.getLogger(websocketsms.class.getName()).log(Level.SEVERE, null, ex);
            } catch (EncodeException ex) {
                Logger.getLogger(websocketsms.class.getName()).log(Level.SEVERE, null, ex);
            }
        });
        hilo.start();
    }

    public void sms(int friendid, int myid, String mensaje, String username, String usermy, Session sesion, String el) throws IOException, URISyntaxException, EncodeException {

        getsms g1 = new getsms();
        if (el.equals("save")) {
            g1.savedata(friendid, myid, mensaje);
        } else {
            consultas c = new consultas();
            c.any_query("SELECT public.removesms(" + mensaje.trim() + "," + myid + ")");
        }
        Thread hilo = new Thread(() -> {
            try {
                getsms g = new getsms();

                JSONObject cuerpo = new JSONObject();
                JSONObject send = new JSONObject();
                cuerpo.put("mychatallfriend", chatsfriend(friendid, myid));
                cuerpo.put("chatfriend", g.getchatfriends(friendid));
                cuerpo.put("idrec", myid);
                send.put("returnrecibe", cuerpo);
                for (Session con : conectados) {
                    if (con.getId().equals(getsessionvalidate(username))) {
                        con.getBasicRemote().sendObject(send);
                    }
                }
                System.out.println("enviado al amigo");
            } catch (EncodeException ex) {
                Logger.getLogger(websocketsms.class.getName()).log(Level.SEVERE, null, ex);
            } catch (IOException ex) {
                Logger.getLogger(websocketsms.class.getName()).log(Level.SEVERE, null, ex);
            } catch (URISyntaxException ex) {
                Logger.getLogger(websocketsms.class.getName()).log(Level.SEVERE, null, ex);
            }
        });
        Thread hilo1 = new Thread(() -> {
            try {
                getsms g = new getsms();
                JSONObject cuerpo = new JSONObject();
                JSONObject send = new JSONObject();
                cuerpo.put("mychatallfriend", chatsfriend(myid, friendid));
                cuerpo.put("chatfriend", g.getchatfriends(myid));
                cuerpo.put("idrec", friendid);
                send.put("returnenvia", cuerpo);
                
                for (Session con : conectados) {
                    if (con.getId().equals(getsessionvalidate(usermy))) {
                        con.getBasicRemote().sendObject(send);
                    }
                    
                }
                //respondertomy(sesion, send);
                System.out.println("enviado a mi");
            } catch (EncodeException ex) {
                Logger.getLogger(websocketsms.class.getName()).log(Level.SEVERE, null, ex);
            } catch (IOException ex) {
                Logger.getLogger(websocketsms.class.getName()).log(Level.SEVERE, null, ex);
            } catch (URISyntaxException ex) {
                Logger.getLogger(websocketsms.class.getName()).log(Level.SEVERE, null, ex);
            }
        });
        hilo.start();
        hilo1.start();
    }
}
