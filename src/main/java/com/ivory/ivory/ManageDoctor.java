/**
 * 
 */
package com.ivory.ivory;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import com.ivory.ivory.models.Doctor;

public class ManageDoctor {

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
}
