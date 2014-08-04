/**
 * 
 */
package com.ivory.ivory;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import com.ivory.ivory.beans.MedicalHistoryQuestion;

/**
 * @author smahapat
 * 
 */
public class ManageMedicalHistory {

	@SuppressWarnings("unchecked")
	public List<MedicalHistoryQuestion> listQuestions()
			throws HibernateException {
		Session session = Hbutil.getSessionFactory().openSession();
		List<MedicalHistoryQuestion> questions = new ArrayList<MedicalHistoryQuestion>();
		try {
			questions = session.createQuery("FROM com.ivory.ivory.beans.MedicalHistoryQuestion").list();
		} catch (HibernateException e) {
			e.printStackTrace();
			throw (new HibernateException(e));
		} finally {
			session.close();
		}
		return questions;
	}

}
