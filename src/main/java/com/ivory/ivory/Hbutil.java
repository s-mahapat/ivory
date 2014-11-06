/**
 * 
 */
package com.ivory.ivory;

import org.hibernate.SessionFactory;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.HibernateException;
import org.apache.log4j.Logger;

/**
 * @author smahapat
 * 
 */
public class Hbutil {
	private static SessionFactory sessionFactory;
	private static ServiceRegistry serviceRegistry;
	private static Logger log = Logger.getLogger(Hbutil.class.getName());

	private static SessionFactory configureSessionFactory()
			throws HibernateException {
		Configuration configuration = new Configuration();
		configuration.configure();
		serviceRegistry = new ServiceRegistryBuilder().applySettings(
				configuration.getProperties()).buildServiceRegistry();
		return configuration.buildSessionFactory(serviceRegistry);
	}
	
	static{
		try {
	        sessionFactory = configureSessionFactory();
	    } catch (Exception e) {
	        log.fatal(e);
	    }
	}

	public static SessionFactory getSessionFactory() {		
		return sessionFactory;
	}
}
