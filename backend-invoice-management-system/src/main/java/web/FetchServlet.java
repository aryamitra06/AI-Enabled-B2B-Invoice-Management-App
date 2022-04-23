package web;
import dao.InvoiceDAO;
import model.Invoice;

import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;


@WebServlet("/")
public class FetchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    private InvoiceDAO invoiceDAO;
    public void init() {
        invoiceDAO = new InvoiceDAO();
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//selecting all invoices
		if(request.getParameter("doc_id") == null && request.getParameter("invoice_id") == null && request.getParameter("custnumber") == null && request.getParameter("cust_number") == null && request.getParameter("buisness_year") == null) {
	        List < Invoice > listInvoice = invoiceDAO.selectAllInvoices();
	        Gson gson = new Gson();
	        String jsonresponse = gson.toJson(listInvoice);
	        response.getWriter().print(jsonresponse);
		}
		
		//search by customer number only (Normal search)
		else if(request.getParameter("custnumber") != null){
				String custnumber = request.getParameter("custnumber");
				List < Invoice > listInvoice = invoiceDAO.searchInvoice(custnumber);
		        Gson gson = new Gson();
		        String jsonresponse = gson.toJson(listInvoice);
		        response.getWriter().print(jsonresponse);
		}
		
		// advance search
		
		else {
			String docid = request.getParameter("doc_id");
			String invoiceid = request.getParameter("invoice_id");
			String cust_number = request.getParameter("cust_number");
			String buisnessyear = request.getParameter("buisness_year");
			if(docid=="") {
				docid = null;
			}
			if(invoiceid == "") {
				invoiceid = null;
			}
			if(cust_number == "") {
				cust_number = null;
			}
			if(buisnessyear == "") {
				buisnessyear = null;
			}
			List < Invoice > listInvoice = invoiceDAO.advanceSearchInvoice(docid, invoiceid, cust_number, buisnessyear);
			Gson gson = new Gson();
			String jsonresponse = gson.toJson(listInvoice);
			response.getWriter().print(jsonresponse);
		}
	}
	
}
