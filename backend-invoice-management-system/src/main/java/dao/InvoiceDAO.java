package dao;
import model.Invoice;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class InvoiceDAO {

	//SQL Statements
	private static final String SELECT_ALL_INVOICES_SQL = "select * from winter_internship";
	private static final String ADD_NEW_INVOICE_SQL = "INSERT  INTO `winter_internship` (`business_code`,`cust_number`," + "`clear_date`,`buisness_year`,`doc_id`,`posting_date`,`document_create_date`," + "`due_in_date`,`invoice_currency`,`document_type`," + "`posting_id`,`total_open_amount`,`baseline_create_date`," + "`cust_payment_terms`,`invoice_id`) VALUES " + "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	private static final String SELECT_INVOICE_BY_ID_SQL = "select invoice_currency, cust_payment_terms from winter_internship where sl_no =?";
	private static final String UPDATE_INVOICE_BY_ID_SQL = "update winter_internship set invoice_currency = ?, cust_payment_terms= ? where sl_no = ?;";
	private static final String DELETE_INVOICE_SQL = "delete from winter_internship where sl_no = ?;";
	private static final String SEARCH_BY_CUST_NUMBER_SQL = "select * from winter_internship where cust_number = ?;";
	private static final String ADVANCE_SEARCH_SQL = "select * from winter_internship where doc_id = ? OR invoice_id = ? OR cust_number = ? OR buisness_year = ?;";
	private static final String ADD_AGING_BUCKET_SQL = "UPDATE winter_internship SET aging_bucket = ? WHERE sl_no=?;";
	private static final String MANUAL_ANALYTICS_SQL = "SELECT * FROM winter_internship WHERE clear_date BETWEEN ? AND ? OR due_in_date BETWEEN ? AND ? OR baseline_create_date BETWEEN ? AND ? OR invoice_currency = ?;";
	protected Connection getConnection() {
		Connection connection = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql:///grey_goose?useSSL=false", "root", "root");
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return connection;
	}
	
	
	//<------ CRUD ------->
	
	// 1. Fetching all invoices
	public List<Invoice> selectAllInvoices() {
		List<Invoice> invoices = new ArrayList<>();
		try (Connection connection = getConnection();
			PreparedStatement statement = connection.prepareStatement(SELECT_ALL_INVOICES_SQL);) {
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				int sl_no = rs.getInt("sl_no");
				String business_code = rs.getString("business_code");
				String cust_number = rs.getString("cust_number");
				String clear_date = rs.getString("clear_date");
				String buisness_year = rs.getString("buisness_year");
				String doc_id = rs.getString("doc_id");
				String posting_date = rs.getString("posting_date");
				String document_create_date = rs.getString("document_create_date");
				String due_in_date = rs.getString("due_in_date");
				String invoice_currency = rs.getString("invoice_currency");
				String document_type = rs.getString("document_type");
				String posting_id = rs.getString("posting_id");
				String total_open_amount = rs.getString("total_open_amount");
				String baseline_create_date = rs.getString("baseline_create_date");
				String cust_payment_terms = rs.getString("cust_payment_terms");
				String invoice_id = rs.getString("invoice_id");
				String aging_bucket = rs.getString("aging_bucket");
				invoices.add(new Invoice(sl_no, business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id, aging_bucket));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return invoices;
	}
	
	// 2. Add a new invoice
	public void addInvoice(Invoice invoice) throws SQLException {
		try (Connection connection = getConnection();
			PreparedStatement preparedStatement = connection.prepareStatement(ADD_NEW_INVOICE_SQL)) {
			preparedStatement.setString(1, invoice.getBusiness_code());
			preparedStatement.setString(2, invoice.getCust_number());
			preparedStatement.setString(3, invoice.getClear_date());
			preparedStatement.setString(4, invoice.getBuisness_year());
			preparedStatement.setString(5, invoice.getDoc_id());
			preparedStatement.setString(6, invoice.getPosting_date());
			preparedStatement.setString(7, invoice.getDocument_create_date());
			preparedStatement.setString(8, invoice.getDue_in_date());
			preparedStatement.setString(9, invoice.getInvoice_currency());
			preparedStatement.setString(10, invoice.getDocument_type());
			preparedStatement.setString(11, invoice.getPosting_id());
			preparedStatement.setString(12, invoice.getTotal_open_amount());
			preparedStatement.setString(13, invoice.getBaseline_create_date());
			preparedStatement.setString(14, invoice.getCust_payment_terms());
			preparedStatement.setString(15, invoice.getInvoice_id());
			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}	
	}
	
	
	// 3.1 getting data from database for each Serial no.
	public Invoice selectInvoice(int sl_no) {
		Invoice invoice = null;
		try (Connection connection = getConnection();
			PreparedStatement statement = connection.prepareStatement(SELECT_INVOICE_BY_ID_SQL);) {
			statement.setInt(1, sl_no);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				String invoice_currency = rs.getString("invoice_currency");
				String cust_payment_terms = rs.getString("cust_payment_terms");
				invoice = new Invoice(sl_no, invoice_currency, cust_payment_terms);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return invoice;
	}
	// 3.2 editing the form for updating data
	public void updateInvoice(Invoice invoice) throws SQLException {
		try (Connection connection = getConnection();
			PreparedStatement statement = connection.prepareStatement(UPDATE_INVOICE_BY_ID_SQL);) {
			statement.setString(1, invoice.getInvoice_currency());
			statement.setString(2, invoice.getCust_payment_terms());
			statement.setInt(3, invoice.getSl_no());
			statement.executeUpdate();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	//4. deleting invoice
	public void deleteInvoice(int sl_no) throws SQLException {
		try (Connection connection = getConnection();
				PreparedStatement statement = connection.prepareStatement(DELETE_INVOICE_SQL);) {
			statement.setInt(1, sl_no);
			statement.executeUpdate();
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	//5. search invoice by customer number
	public List<Invoice> searchInvoice(String custnumber) {
		List<Invoice> invoices = new ArrayList<>();
		try (Connection connection = getConnection();
			PreparedStatement statement = connection.prepareStatement(SEARCH_BY_CUST_NUMBER_SQL);) {
			statement.setString(1, custnumber);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				int sl_no = rs.getInt("sl_no");
				String business_code = rs.getString("business_code");
				String cust_number = rs.getString("cust_number");
				String clear_date = rs.getString("clear_date");
				String buisness_year = rs.getString("buisness_year");
				String doc_id = rs.getString("doc_id");
				String posting_date = rs.getString("posting_date");
				String document_create_date = rs.getString("document_create_date");
				String due_in_date = rs.getString("due_in_date");
				String invoice_currency = rs.getString("invoice_currency");
				String document_type = rs.getString("document_type");
				String posting_id = rs.getString("posting_id");
				String total_open_amount = rs.getString("total_open_amount");
				String baseline_create_date = rs.getString("baseline_create_date");
				String cust_payment_terms = rs.getString("cust_payment_terms");
				String invoice_id = rs.getString("invoice_id");
				String aging_bucket = rs.getString("aging_bucket");
				invoices.add(new Invoice(sl_no, business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id, aging_bucket));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return invoices;
	}
	
	//6. Advance search
	public List<Invoice> advanceSearchInvoice(String docid, String invoiceid, String custnumber, String buisnessyear) {
		List<Invoice> invoices = new ArrayList<>();
		try (Connection connection = getConnection();
			PreparedStatement statement = connection.prepareStatement(ADVANCE_SEARCH_SQL);) {
			statement.setString(1, docid);
			statement.setString(2, invoiceid);
			statement.setString(3, custnumber);
			statement.setString(4, buisnessyear);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				int sl_no = rs.getInt("sl_no");
				String business_code = rs.getString("business_code");
				String cust_number = rs.getString("cust_number");
				String clear_date = rs.getString("clear_date");
				String buisness_year = rs.getString("buisness_year");
				String doc_id = rs.getString("doc_id");
				String posting_date = rs.getString("posting_date");
				String document_create_date = rs.getString("document_create_date");
				String due_in_date = rs.getString("due_in_date");
				String invoice_currency = rs.getString("invoice_currency");
				String document_type = rs.getString("document_type");
				String posting_id = rs.getString("posting_id");
				String total_open_amount = rs.getString("total_open_amount");
				String baseline_create_date = rs.getString("baseline_create_date");
				String cust_payment_terms = rs.getString("cust_payment_terms");
				String invoice_id = rs.getString("invoice_id");
				String aging_bucket = rs.getString("aging_bucket");
				invoices.add(new Invoice(sl_no, business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id, aging_bucket));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return invoices;
	}
	
	//7. Manual analytics view
	public List<Invoice> manualAnalyticsView(String cleardate_from, String cleardate_to, String duedate_from, String duedate_to, String baselinedate_from, String baselinedate_to, String invoicecurrency) {
		List<Invoice> invoices = new ArrayList<>();
		try (Connection connection = getConnection();
			PreparedStatement statement = connection.prepareStatement(MANUAL_ANALYTICS_SQL);) {
			statement.setString(1, cleardate_from);
			statement.setString(2, cleardate_to);
			statement.setString(3, duedate_from);
			statement.setString(4, duedate_to);
			statement.setString(5, baselinedate_from);
			statement.setString(6, baselinedate_to);
			statement.setString(7, invoicecurrency);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				int sl_no = rs.getInt("sl_no");
				String business_code = rs.getString("business_code");
				String cust_number = rs.getString("cust_number");
				String clear_date = rs.getString("clear_date");
				String buisness_year = rs.getString("buisness_year");
				String doc_id = rs.getString("doc_id");
				String posting_date = rs.getString("posting_date");
				String document_create_date = rs.getString("document_create_date");
				String due_in_date = rs.getString("due_in_date");
				String invoice_currency = rs.getString("invoice_currency");
				String document_type = rs.getString("document_type");
				String posting_id = rs.getString("posting_id");
				String total_open_amount = rs.getString("total_open_amount");
				String baseline_create_date = rs.getString("baseline_create_date");
				String cust_payment_terms = rs.getString("cust_payment_terms");
				String invoice_id = rs.getString("invoice_id");
				String aging_bucket = rs.getString("aging_bucket");
				invoices.add(new Invoice(sl_no, business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id, aging_bucket));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return invoices;
	}
	
	//8. adding aging bucket
	public void addAgingBucket(Invoice invoice) throws SQLException {
		try (Connection connection = getConnection();
			PreparedStatement statement = connection.prepareStatement(ADD_AGING_BUCKET_SQL);) {
			statement.setString(1, invoice.getAging_bucket());
			statement.setInt(2, invoice.getSl_no());
			statement.executeUpdate();
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
}
