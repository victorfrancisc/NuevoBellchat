/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package login;

import conexion.conecction;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.imageio.ImageIO;

/**
 *
 * @author wladi
 */
public class saveimgperfil {
    
    public static byte[] ImageToByte(File file) throws FileNotFoundException, IOException {

        FileInputStream fis = new FileInputStream(file);
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] buf = new byte[1024];
        try {
            for (int readNum; (readNum = fis.read(buf)) != -1;) {
                bos.write(buf, 0, readNum);
                System.out.println("read " + readNum + " bytes,");
            }
        } catch (IOException ex) {
        }
        byte[] bytes = bos.toByteArray();
        return bytes;
    }

    public byte[] getImage(int p) throws SQLException {
  byte[] byteImg = null;
   connection = c.getConnection();
   connection.createStatement();
  try {
   PreparedStatement ps = connection
     .prepareStatement("select photo from peoples where idperson="+p);
   ResultSet rs = ps.executeQuery();
   while (rs.next()) {
    byteImg = rs.getBytes(1);
   }
   rs.close();
 
   return byteImg;
  } catch (Exception e) {
      return null;
  }
 
    }
    Statement st = null;
    Connection connection;
        conecction c = new conecction();

    public void addImage(byte[] img,int p) {
        try {
            connection = c.getConnection();
            connection.createStatement();
            PreparedStatement ps = connection.prepareStatement("update peoples set photo=? where idperson="+p);
            ps.setBytes(1, img);
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {

            } catch (Exception e) {

            }

        }
    }
    public void bytetoimage(byte[] h,int p) throws SQLException, IOException, URISyntaxException
    {
        if(h!=null)
        {
    ByteArrayInputStream bis = new ByteArrayInputStream(h);
      BufferedImage bImage2 = ImageIO.read(bis);
      File foto=new File(""+p+".jpg");
      ImageIO.write(bImage2, "jpg", foto );
      System.out.println("image created "+foto.getAbsolutePath());}
    }
}
