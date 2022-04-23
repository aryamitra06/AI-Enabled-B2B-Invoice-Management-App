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

@WebServlet("/getanalytics")
public class ManualAnalyticsView extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    private InvoiceDAO invoiceDAO;
    public void init() {
        invoiceDAO = new InvoiceDAO();
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String cleardate_from = request.getParameter("cleardate_from");
		String cleardate_to = request.getParameter("cleardate_to");
		String duedate_from = request.getParameter("duedate_from");
		String duedate_to = request.getParameter("duedate_to");
		String baselinedate_from = request.getParameter("baselinedate_from");
		String baselinedate_to = request.getParameter("baselinedate_to");
		String invoicecurrency = request.getParameter("invoicecurrency");
		
		if(cleardate_from=="") {
			cleardate_from = null;
		}
		if(cleardate_to=="") {
			cleardate_to = null;
		}
		if(duedate_from=="") {
			duedate_from = null;
		}
		if(duedate_to=="") {
			duedate_to = null;
		}
		if(baselinedate_from=="") {
			baselinedate_from = null;
		}
		if(baselinedate_to=="") {
			baselinedate_to = null;
		}
		if(invoicecurrency=="") {
			invoicecurrency = null;
		}
		List < Invoice > listInvoice = invoiceDAO.manualAnalyticsView(cleardate_from, cleardate_to, duedate_from, duedate_to, baselinedate_from, baselinedate_to, invoicecurrency);
		Gson gson = new Gson();
		String jsonresponse = gson.toJson(listInvoice);
		response.getWriter().print(jsonresponse);
	}
}
