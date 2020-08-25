/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author USUARIO
 */
public class conecction {

       private String username = "Preuba1";
    private String pass = "123456";
    private String classname = "org.postgresql.Driver";
    private String url = "jdbc:postgresql://localhost:5433/pi_messager2";
    private Connection conn;

    public conecction() {
        try {
            Class.forName(classname);
            conn = DriverManager.getConnection(url, username, pass);

        } catch (Exception e) {
            System.err.println(e.getMessage() + " error");
        }
    }

    public Connection getConnection() {
        return this.conn;
    }

    public static void main(String[] args) {
//        conecction co = new conecction();
//        co.getConnection();
//        Statement st;
//        ResultSet rs;
//        try {
//            st = co.getConnection().createStatement();
//            rs = st.executeQuery("select *from personas where idp=1");
//            while(rs.next())
//            {
//                System.out.println(rs.getString(1));
//            }
//        } catch (SQLException ex) {
//            Logger.getLogger(conecction.class.getName()).log(Level.SEVERE, null, ex);
//        }
  }

}
