package web;
import dao.InvoiceDAO;
import model.Invoice;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/predict")
public class PredictServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    private InvoiceDAO invoiceDAO;
    public void init() {
        invoiceDAO = new InvoiceDAO();
    }
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	
    	String agingbuckets = request.getParameter("agingbuckets");
    	String slnos = request.getParameter("slnos");
    	
    	List<String> slnoslist = new ArrayList<String>(Arrays.asList(slnos.split(",")));
    	List<String> agingbucketslist = new ArrayList<String>(Arrays.asList(agingbuckets.split(",")));
    	
    	slnoslist.forEach(slno->{
        	agingbucketslist.forEach(agingbkt->{
        		Invoice newInvoice = new Invoice(agingbkt, Integer.parseInt(slno));
        		try {
        			invoiceDAO.addAgingBucket(newInvoice);
        		} catch (SQLException e) {
        			e.printStackTrace();
        		}
        	});
    	});
	}

}
