/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package conexion;

import java.sql.ResultSet;
import java.sql.Statement;

/**
 *
 * @author wladi
 */
public class consultas {
      ResultSet rs = null;
        Statement st = null;

    public int consul(String consulta) {
        int id=0;
        try {
            conecction c=new conecction();
            st = c.getConnection().createStatement();
            rs = st.executeQuery(consulta);
            rs.next();
            id=rs.getInt(1);
            return id;
        } catch (Exception e) {
            System.err.print("ERROR" + e.getMessage());

        } finally {
            try {
                if (st.getConnection() != null) {
                  st.close();
                }
            } catch (Exception e) {
                System.err.println("ERROR" + e);
            }
        }
        return id;
    }
    public String getuser(String consulta) {
        String id="";
        try {
            conecction c=new conecction();
            st = c.getConnection().createStatement();
            rs = st.executeQuery(consulta);
            rs.next();
            id=rs.getString(1);
            return id;
        } catch (Exception e) {
            System.err.print("ERROR" + e.getMessage());

        } finally {
            try {
                if (st.getConnection() != null) {
                  st.close();
                }
            } catch (Exception e) {
                System.err.println("ERROR" + e);
            }
        }
        return id;
    }
    public ResultSet any_query(String consulta) {
        int id=0;
        try {
            conecction c=new conecction();
            st = c.getConnection().createStatement();
            rs = st.executeQuery(consulta);
            return rs;
        } catch (Exception e) {
            System.err.print("ERROR" + e.getMessage());

        } finally {
            try {
                if (st.getConnection() != null) {
                  //st.close();
                }
            } catch (Exception e) {
                System.err.println("ERROR" + e);
            }
        }
        return rs;
    }
}
