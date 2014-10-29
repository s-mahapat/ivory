package com.ivory.ivory;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Config {
	
	private static Properties prop;
	private static Boolean isLoaded = false;
	
	public static String getConfig(String key) throws IOException{
		if(!isLoaded){
			loadProperties();
		}
		return (String) prop.get(key);	
	}
	
	private static void loadProperties() throws IOException {		 
		prop = new Properties();
		String propFileName = "config.properties";
 
		InputStream inputStream = Config.class.getClassLoader().getResourceAsStream(propFileName);
		prop.load(inputStream);
		if (inputStream == null) {
			throw new FileNotFoundException("property file '" + propFileName + "' not found in the classpath");
		}
		inputStream.close();
		isLoaded = true;

	}

}
