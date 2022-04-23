package web;
import dao.InvoiceDAO;

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


@WebServlet("/delete")
public class DeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    private InvoiceDAO invoiceDAO;
    public void init() {
        invoiceDAO = new InvoiceDAO();
    }

	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String paramslnos = request.getParameter("slnos");
		List<String> slnos = new ArrayList<String>(Arrays.asList(paramslnos.split(",")));
		slnos.forEach(slno->{
			try {
				invoiceDAO.deleteInvoice(Integer.parseInt(slno));
			} catch (NumberFormatException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		});
	}


}
