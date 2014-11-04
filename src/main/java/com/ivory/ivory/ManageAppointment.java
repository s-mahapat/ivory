/**
 * 
 */
package com.ivory.ivory;

import java.util.ArrayList;
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

	public Appointment addAppointment(int patientID, Appointment appointment) {
		Session session = Hbutil.getSessionFactory().openSession();
		Transaction tx = null;
		Appointment newappointment = null;
		try {
			tx = session.beginTransaction();
			Patient patient = (Patient) session.get(Patient.class, patientID);
			patient.addAppointment(appointment);
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
	
	public List<Appointment> getAppointmentList(int id) {
		Session session = Hbutil.getSessionFactory().openSession();
		List<Appointment> appointments = new ArrayList<Appointment>();
		try {
			Patient patient = (Patient) session.get(Patient.class, id);
			appointments.addAll(patient.getAppointments());
		} catch (HibernateException e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return appointments;
	}
}

