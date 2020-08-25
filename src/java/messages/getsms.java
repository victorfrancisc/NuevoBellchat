/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package messages;

import conexion.consultas;
import java.io.IOException;
import java.net.URISyntaxException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import login.saveimgperfil;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author wladi
 */
public class getsms {

    ResultSet cs;

    public JSONObject getsmss(int iduser, int iduserfriends) throws IOException, URISyntaxException {
        consultas c = new consultas();
        JSONObject json = new JSONObject();
        cs = c.any_query("select k.idreceiver, k.idtransmitter,k.\"message\", to_char(k.datetime, 'YYYY-MM-DD')AS fecha,\n"
                + "                to_char(k.datetime,'HH24:MI') tiempo\n"
                + "                , k.idmessage from\n"
                + "                (select su.idmessage, su.idreceiver, su.idtransmitter,su.\"message\",su.datetime from \n"
                + "		 (select *from messages where idmessage not in\n"
                + "		(select public.listar_clientes_mesaages(" + iduser + "))) su\n"
                + "                 where su.idreceiver=(public.user_to_person(" + iduser + ")) or su.idtransmitter=(select public.user_to_person(" + iduser + ")) \n"
                + "				 )k\n"
                + "                 where k.idreceiver=(public.user_to_person(" + iduser + ")) and k.idtransmitter=(select public.user_to_person(" + iduserfriends + "))\n"
                + "                 or k.idreceiver=(public.user_to_person(" + iduserfriends + ")) and k.idtransmitter=(select public.user_to_person(" + iduser + "))\n"
                + "                 order by k.datetime asc");
        try {
            List<String> campos = new ArrayList<String>();
            JSONArray nsms = new JSONArray();
            while (cs.next()) {
                campos.add(cs.getString(1));
                campos.add(cs.getString(2));
                campos.add(cs.getString(3));
                campos.add(cs.getString(4));
                campos.add(cs.getString(5));
                campos.add(cs.getString(6));
                nsms.put(campos);
                campos.clear();
            }
            json.put("data", nsms);
            System.out.println(nsms.toString());
            cs.close();
        } catch (SQLException ex) {
            Logger.getLogger(getsms.class.getName()).log(Level.SEVERE, null, ex);
        }
        return json;
    }

    public JSONObject getchatfriends(int iduser) throws IOException, URISyntaxException {
        JSONObject json = new JSONObject();
        try {
            consultas c = new consultas();
            saveimgperfil bd = new saveimgperfil();
            List<String> campos = new ArrayList<String>();
            List<String> ids = new ArrayList<String>();
            JSONArray nchats = new JSONArray();
            ResultSet uses;
            uses = c.any_query("select \n"
                    + " case (SUBSTRING (o.ids from 1 for ((select position(',' in o.ids)-1))))::integer \n"
                    + " when (public.user_to_person(" + iduser + "))\n"
                    + " then substring( o.ids from (select position(',' in o.ids ))+1 for (select LENGTH(o.ids)))\n"
                    + " else (SUBSTRING (o.ids from 1 for ((select position(',' in o.ids)-1))))\n"
                    + " end as id, o.datetime\n"
                    + " from (\n"
                    + " select concat(l.idreceiver,',',l.idtransmitter) ids,l.datetime  from (select idreceiver, idtransmitter,datetime from messages\n"
                    + " where idreceiver=(public.user_to_person(" + iduser + ")) or idtransmitter=(select public.user_to_person(" + iduser + ")) order by datetime desc)l)o\n"
                    + "  ");
            boolean sino = false;
            while (uses.next()) {
                for (int a = 0; a < ids.size(); a++) {
                    if (ids.get(a).equals(String.valueOf(uses.getInt(1)))) {
                        sino = true;
                    }
                }
                if (!sino) {
                    ids.add(String.valueOf(uses.getInt(1)));
                    cs = c.any_query("select k.message, k.fecha, k.tiempo,k.idfriend,u.\"USER\" ,concat(TRIM (p.first_name),' ',TRIM (p.last_name)) nombres,\n"
                            + "p.address,p.email,p.phone\n"
                            + "                           from (select u.\"message\", to_char(u.datetime, 'YYYY-MM-DD')AS fecha,\n"
                            + "                             to_char(u.datetime,'HH24:MI') tiempo,(public.user_to_person("+uses.getInt(1)+")) idfriend from \n"
                            + "								 (select *from messages where idmessage not in\n"
                            + "									(select public.listar_clientes_mesaages("+iduser+"))) u\n"
                            + "                             where u.idreceiver=(public.user_to_person("+iduser+")) and u.idtransmitter=(select public.user_to_person("+uses.getInt(1)+"))\n"
                            + "                             or u.idreceiver=(public.user_to_person("+uses.getInt(1)+")) and u.idtransmitter=(select public.user_to_person("+iduser+"))\n"
                            + "                            			 order by datetime desc \n"
                            + "                            			   limit 1 ) k inner join peoples p on p.idperson=k.idfriend inner join users u on u.idperson=p.idperson");
                    while (cs.next()) {
                        // bd.bytetoimage(bd.getImage(uses.getInt(1)),uses.getInt(1));
                        campos.add(String.valueOf(uses.getInt(1)));
                        campos.add(cs.getString(5).trim());
                        campos.add(cs.getString(6).trim());
                        campos.add(cs.getString(1).trim());
                        campos.add(cs.getString(2).trim());
                        campos.add(cs.getString(3).trim());
                        campos.add(cs.getString(7).trim());
                        campos.add(cs.getString(8).trim());
                        campos.add(cs.getString(9).trim());
                        nchats.put(campos);
                        campos.clear();
                    }
                } else {
                    sino = false;
                }
            }
            json.put("mychat", nchats);
            uses.close();
            cs.close();
        } catch (SQLException ex) {
            Logger.getLogger(getsms.class.getName()).log(Level.SEVERE, null, ex);
        }
        return json;
    }

    public int savedata(int idreceiver, int idsend, String messages) {
        conexion.consultas c = new consultas();
        int g = c.consul("select public.save_messages(" + idreceiver + "," + idsend + ",'" + messages + "')");
        return g;
    }

    public String bytetostring(byte[] _bytes) {
        String file_string = "";

        for (int i = 0; i < _bytes.length; i++) {
            file_string += (char) _bytes[i];
        }

        return file_string;
    }

}
