/**
 * 
 */
package com.ivory.ivory;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.apache.log4j.Logger;

import com.ivory.ivory.models.Doctor;
import com.ivory.ivory.models.Patient;

public class ManageDoctor {
	
	private static Logger log = Logger.getLogger(ManageDoctor.class.getName());

	public Doctor addDoctor(Doctor doctor) {
		Session session = Hbutil.getSessionFactory().openSession();
		Transaction tx = null;
		Doctor newdoctor = null;
		try {
			tx = session.beginTransaction();
			session.save(doctor);
			tx.commit();
			newdoctor = doctor;
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return newdoctor;
	}
	
	/**
	 * Searches for doctors given a search string. The search is done for
	 * firstname, lastname, mobile, and email.
	 * 
	 * @param searchString
	 *            one of the above patient attributes like firstname, etc
	 * @return returns a list of patient objects
	 */
	@SuppressWarnings("unchecked")
	public List<Doctor> searchDoctor(String searchString) {
		Session session = Hbutil.getSessionFactory().openSession();
		List<Doctor> doctors = null;
		try {
			//tx = session.beginTransaction();
			// Add restriction.
			Criterion fnameCr = Restrictions.like("fname", searchString,
					MatchMode.ANYWHERE);
			Criterion lnameCr = Restrictions.like("lname", searchString,
					MatchMode.ANYWHERE);
			Criterion mobileCr = Restrictions.like("mobile", searchString,
					MatchMode.EXACT);
			Criterion emailCr = Restrictions.like("email", searchString,
					MatchMode.ANYWHERE);
			Criterion completeCr = Restrictions.disjunction().add(fnameCr)
					.add(lnameCr).add(mobileCr).add(emailCr);
			Criteria cr = session.createCriteria(Doctor.class);
			cr.add(completeCr);
			//cr.setFirstResult(skip);
			//cr.setMaxResults(pageSize);
			doctors = cr.list();
			//tx.commit();
		} catch (HibernateException e) {
			log.fatal(e);
		} finally {
			session.close();
		}
		return doctors;

	}
}
