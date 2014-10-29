/**
 * 
 */
package com.ivory.ivory.models;

/**
 * @author smahapat
 *
 */
public class MedicalHistoryQuestion {
	
	private int id;
	private String question;
	private boolean isCheckBox;
	private boolean isText;
	private boolean isRadioButton;
	private boolean isListItem;
	private String answer;
	
	public int getId(){
		return this.id;
	}
	
	public void setId(int id){
		this.id = id;
	}
	
	public String getQuestion(){
		return this.question;
	}
	
	public void setQuestion(String question){
		this.question = question;
	}
	
	public boolean getIsCheckBox(){
		return this.isCheckBox;
	}
	
	public void setIsCheckBox(boolean val){
		this.isCheckBox = val;
	}
	
	public boolean getIsText(){
		return this.isText;
	}
	
	public void setIsText(boolean val){
		this.isText = val;
	}
	
	public boolean getIsRadioButton(){
		return this.isRadioButton;
	}
	
	public void setIsRadioButton(boolean val){
		this.isRadioButton = val;
	}
	
	public boolean getIsListItem(){
		return this.isListItem;
	}
	
	public void setIsListItem(boolean val){
		this.isListItem = val;
	}
	
	public String getAnswer(){
		return this.answer;
	}
	
	public void setAnswer(String ans){
		this.answer = ans;
	}

}
