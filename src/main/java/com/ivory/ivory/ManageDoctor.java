/**
 * 
 */
package com.ivory.ivory;

import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import com.ivory.ivory.beans.Doctor;

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
