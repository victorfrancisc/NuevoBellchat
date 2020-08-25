/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package login;

import conexion.consultas;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

/**
 *
 * @author wladi
 */
public class registrar extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet registrar</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet registrar at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
         PrintWriter out = response.getWriter();
        String data = request.getParameter("json");
        JSONObject json = new JSONObject(data);
        JSONObject peoples = json.getJSONObject("peoples");
        JSONObject credencial = json.getJSONObject("credenciales");
        JSONObject disab = json.getJSONObject("discapacidad");
int per=0;
        consultas c=new consultas();
        try {
              per= c.consul("SELECT public.save_peoples('"+peoples.getString("name")+"','"+peoples.getString("ape")+"','"+
                peoples.getString("dir")+"','"+peoples.getString("email")+"','"+peoples.getString("tele")+"','"+peoples.getString("fec")+"')");
       
       c.consul("SELECT public.save_users("+per+",'"+credencial.getString("user")+"','"+credencial.getString("pass")+"')"); 
       if(disab.toString().length()>4){
       c.consul("SELECT public.save_disabilities("+per+","+disab.getString("tipo")+",'"+disab.getString("grado")+"','"+
               disab.getString("desc")+"')");}
             System.out.println("do post  " + per);
        } catch (Exception e) {
            per=0;
        }
      

       response.setCharacterEncoding("UTF-8");
            response.setContentType("text/plain");
            response.getWriter().write(""+per+"");
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
