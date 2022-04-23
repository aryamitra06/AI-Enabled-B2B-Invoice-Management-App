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

@WebServlet("/add")
public class AddServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    private InvoiceDAO invoiceDAO;
    public void init() {
        invoiceDAO = new InvoiceDAO();
    }
    
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
    	Invoice i = gson.fromJson(jb.toString(), Invoice.class);
		String business_code = i.getBusiness_code();
		String cust_number = i.getCust_number();
		String clear_date = i.getClear_date();
		String buisness_year = i.getBuisness_year();
		String doc_id = i.getDoc_id();
		String posting_date = i.getPosting_date();
		String document_create_date = i.getDocument_create_date();
		String due_in_date = i.getDue_in_date();
		String invoice_currency = i.getInvoice_currency();
		String document_type = i.getDocument_type();
		String posting_id = i.getPosting_id();
	    String total_open_amount = i.getTotal_open_amount();
		String baseline_create_date = i.getBaseline_create_date();
		String cust_payment_terms = i.getCust_payment_terms();
		String invoice_id = i.getInvoice_id();
    	
        Invoice newInvoice = new Invoice(business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id);
		try {
			invoiceDAO.addInvoice(newInvoice);
			response.getWriter().print("Success");
		} catch (SQLException e) {
			response.getWriter().print("Failed to add data");
			e.printStackTrace();
		}
	}

}
