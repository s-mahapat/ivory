/**
 * 
 */
package com.ivory.ivory;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import com.ivory.ivory.models.MedicalHistory;
import com.ivory.ivory.models.Patient;
import com.ivory.ivory.models.TreatmentPlan;

/**
 * @author smahapat
 * 
 */
public class ManagePatient {
	
	private static Logger log = Logger.getLogger(ManagePatient.class.getName());

	public Patient addPatient(Patient patient) {
		Session session = Hbutil.getSessionFactory().openSession();
		Transaction tx = null;
		Patient newpatient = null;
		try {
			tx = session.beginTransaction();
			session.save(patient);
			tx.commit();
			newpatient = patient;
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			log.fatal(e);
		} finally {
			session.flush();
			session.close();
		}
		return newpatient;
	}

	public Patient updatePatient(Patient patient) {
		Session session = Hbutil.getSessionFactory().openSession();
		Transaction tx = null;
		Patient updatedPatient = null;
		try {
			tx = session.beginTransaction();
			Patient oldpatient = (Patient) session.get(Patient.class,
					patient.getId());
			oldpatient.setAddress(patient.getAddress());
			oldpatient.setDob(patient.getDob());
			oldpatient.setEmail(patient.getEmail());
			oldpatient.setFname(patient.getFname());
			oldpatient.setGender(patient.getGender());
			oldpatient.setLname(patient.getLname());
			oldpatient.setMobile(patient.getMobile());
			oldpatient.setPhone(patient.getPhone());
			session.update(oldpatient);
			tx.commit();
			updatedPatient = oldpatient;
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			log.fatal(e);
		} finally {
			session.flush();
			session.close();
		}
		return updatedPatient;
	}

	/* Method to CREATE an patient in the database */
	public Integer addPatient(String fname, String lname, String email,
			String address, Date dob, String gender, String phone,
			String mobile, Map<Integer, String> medicalHistory) {
		Session session = Hbutil.getSessionFactory().openSession();
		Transaction tx = null;
		Integer patientID = null;
		try {
			tx = session.beginTransaction();
			Patient patient = new Patient(fname, lname, email, address, dob,
					gender, phone, mobile);
			patientID = (Integer) session.save(patient);

			/*
			 * for each answer to a question create a MedicalHistory object and
			 * save it. Commit at the end of saving the user and all answers to
			 * medical history questions
			 */
			for (Map.Entry<Integer, String> entry : medicalHistory.entrySet()) {
				int questionId = entry.getKey();
				String answer = entry.getValue();

				// if the answer length is zero do not consider this question
				if (answer.length() == 0) {
					continue;
				}

				MedicalHistory mh = new MedicalHistory(patientID, questionId,
						answer);
				session.save(mh);
			}
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			log.fatal(e);
		} finally {
			session.flush();
			session.close();
		}
		return patientID;
	}

	/**
	 * Searches for patients given a search string. The search is done for
	 * firstname, lastname, mobile, and email.
	 * 
	 * @param searchString
	 *            one of the above patient attributes like firstname, etc
	 * @return returns a list of patient objects
	 */
	@SuppressWarnings("unchecked")
	public List<Patient> searchPatient(String searchString) {
		Session session = Hbutil.getSessionFactory().openSession();
		List<Patient> patients = null;
		Criterion completeCr = null;
		try{
			Criterion idCr = Restrictions.idEq(Integer.parseInt(searchString));
			completeCr = Restrictions.disjunction().add(idCr);
		}catch(NumberFormatException ex){
			log.debug("Searching by id I guess");
			Criterion fnameCr = Restrictions.like("fname", searchString,
					MatchMode.ANYWHERE);
			Criterion lnameCr = Restrictions.like("lname", searchString,
					MatchMode.ANYWHERE);
			Criterion mobileCr = Restrictions.like("mobile", searchString,
					MatchMode.EXACT);
			Criterion emailCr = Restrictions.like("email", searchString,
					MatchMode.ANYWHERE);
			completeCr = Restrictions.disjunction().add(fnameCr)
					.add(lnameCr).add(mobileCr).add(emailCr);
		} 
		
		try {
			Criteria cr = session.createCriteria(Patient.class);
			cr.add(completeCr);
			patients = cr.list();
		} catch (HibernateException e) {
			log.fatal(e);
		} finally {
			session.close();
		}
		return patients;

	}

	@SuppressWarnings("unchecked")
	public List<Patient> listPatients() {
		Session session = Hbutil.getSessionFactory().openSession();
		Transaction tx = null;
		List<Patient> patients = null;
		try {
			tx = session.beginTransaction();
			patients = session.createCriteria(Patient.class).list();
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			log.fatal(e);
		} finally {
			session.close();
		}
		return patients;
	}

	/**
	 * Gets the patient details like first name, address mobile etc
	 * 
	 * @param id
	 *            patient id
	 * @return Patient Object
	 */
	public Patient getPatientDetails(int id) {
		Session session = Hbutil.getSessionFactory().openSession();
		Transaction tx = null;
		Patient patient = null;
		try {
			tx = session.beginTransaction();
			// Add restriction to get patient with id
			Criterion idCr = Restrictions.idEq(id);
			Criteria cr = session.createCriteria(Patient.class);
			cr.add(idCr);
			patient = (Patient) cr.uniqueResult();
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			log.fatal(e);
		} finally {
			session.close();
		}
		return patient;
	}
	
	public TreatmentPlan saveTreatmentPlan(int id, TreatmentPlan treatment_plan){
		Session session = Hbutil.getSessionFactory().openSession();
		Transaction tx = null;
		TreatmentPlan tp = null;		
		Patient patient = (Patient) session.get(Patient.class, id);
		treatment_plan.setPatient(patient);
		try {
			tx = session.beginTransaction();
			session.save(treatment_plan);
			tx.commit();
			session.flush();
			tp = treatment_plan;
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			log.fatal(e);
		} finally {
			session.close();
		}
		return tp;
	}
	
	//@SuppressWarnings("unchecked")
	public List<TreatmentPlan> getTreatmentPlans(int id){
		Session session = Hbutil.getSessionFactory().openSession();
		Transaction tx = null;
		List<TreatmentPlan> tp = new ArrayList<TreatmentPlan>();
		//int fromIndex = (page - 1) * size;
		// toindex is excluded in sublist function
		//int toIndex = fromIndex + size;				
		try {			
			tx = session.beginTransaction();
			Patient patient = (Patient) session.get(Patient.class, id);
			//int listSize = patient.getTreatmentPlans().size();
			//toIndex =  listSize - 1 > toIndex ? toIndex : listSize - 1;
			//tp.addAll(patient.getTreatmentPlans().subList(fromIndex, toIndex));
			tp.addAll(patient.getTreatmentPlans());
			tx.commit();
		} catch (HibernateException e) {
			
			e.printStackTrace();
		}catch(NullPointerException e){
			log.fatal(e);
		}
		finally {
			session.close();
		}
		return tp;
	}
}
