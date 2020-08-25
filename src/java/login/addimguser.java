/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package login;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;
import java.net.URISyntaxException;
import java.sql.SQLException;
import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.servlet.http.Part;

/**
 *
 * @author wladi
 */
@Named(value = "addimguser")
@RequestScoped
public class addimguser {

    /**
     * Creates a new instance of addimguser
     */
    public addimguser() {
    }
    private Part fileUpload;

    /**
     * Creates a new instance of FileUploadFormBean
     */
    public Part getFileUpload() {
        return fileUpload;
    }
    int idp;

    public int getIdp() {
        return idp;
    }

    public void setIdp(int idp) {
        this.idp = idp;
    }

    public void setFileUpload(Part fileUpload) {
        this.fileUpload = fileUpload;
    }

    public void upload() throws IOException, SQLException, URISyntaxException {
        if (fileUpload != null) {
            InputStream in = fileUpload.getInputStream();
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            byte[] buf = new byte[1024];
            try {
                for (int readNum; (readNum = in.read(buf)) != -1;) {
                    bos.write(buf, 0, readNum);
                    System.out.println("read " + readNum + " bytes,");
                }
            } catch (IOException ex) {
            }
            byte[] bytes = bos.toByteArray();
            saveimgperfil bd = new saveimgperfil();
            bd.addImage(bytes, idp);
            bd.bytetoimage(bd.getImage(idp), idp);
            FacesMessage message = new FacesMessage("Successful", fileUpload.getName() + " is uploaded.");
            FacesContext.getCurrentInstance().addMessage(null, message);
        }
    }

}
