package web;
import dao.InvoiceDAO;
import model.Invoice;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;


@WebServlet("/edit")
public class EditServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    private InvoiceDAO invoiceDAO;
    public void init() {
        invoiceDAO = new InvoiceDAO();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int slno = Integer.parseInt(request.getParameter("slno"));
		Invoice existingInvoice = invoiceDAO.selectInvoice(slno);
		Gson gson = new Gson();
		String jsonresponse = gson.toJson(existingInvoice);
		response.getWriter().print(jsonresponse);
	}

	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	StringBuffer jb = new StringBuffer();
    	String line = null;
    	try {
    		BufferedReader reader = request.getReader();
    		while((line = reader.readLine())!=null)
    			jb.append(line);
    	}
    	catch (Exception e) {
    		e.printStackTrace();
    	}
    	Gson gson = new Gson();
    	Invoice invoice = gson.fromJson(jb.toString(), Invoice.class);
    	
        int slno = Integer.parseInt(request.getParameter("slno"));
        String invoice_currency = invoice.getInvoice_currency();
        String cust_payment_terms = invoice.getCust_payment_terms();
        Invoice updateInvoice = new Invoice(slno, invoice_currency, cust_payment_terms);
        try {
			invoiceDAO.updateInvoice(updateInvoice);
			response.getWriter().print("Success");
		} catch (SQLException e) {
			response.getWriter().print("Error");
		}
	}

}
