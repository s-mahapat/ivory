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
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.ivory.ivory.models.Patient;
import com.ivory.ivory.models.Appointment;

public class ManageAppointment {

	public Appointment addAppointment(Appointment appointment) {
		Session session = Hbutil.getSessionFactory().openSession();
		Transaction tx = null;
		Appointment newappointment = null;
		try {
			tx = session.beginTransaction();
			session.save(appointment);
			tx.commit();
			newappointment = appointment;
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return newappointment;
	}
	
	@SuppressWarnings("unchecked")
	public List<Appointment> getAppointmentList(int patientId) {
		Session session = Hbutil.getSessionFactory().openSession();
		Transaction tx = null;
		List<Appointment> Appointment = null;
		try {
			tx = session.beginTransaction();
			Criterion idCr = Restrictions.eq("patientid", patientId);
			Criteria cr	= session.createCriteria(Appointment.class);
			cr.add(idCr);
			
			cr.addOrder(Order.desc("id"));
			cr.setMaxResults(5);
			Appointment = cr.list();
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return Appointment;
	}
}

