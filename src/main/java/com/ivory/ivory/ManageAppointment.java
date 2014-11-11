/**
 * 
 */
package com.ivory.ivory;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.ivory.ivory.models.Patient;
import com.ivory.ivory.models.Appointment;

public class ManageAppointment {
	
	private static Logger log = Logger.getLogger(ManageAppointment.class.getName());

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
			log.fatal(e);
		} finally {
			session.flush();
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
			log.fatal(e);
		} finally {
			session.close();
		}
		return appointments;
	}
}

