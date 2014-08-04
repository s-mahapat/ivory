<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page isELIgnored="false"%>
<form class="form-horizontal" name="patientform" id="patientform" method="post"
	action="patient">
	<div class="col-lg-6">
		<div class="form-group">
			<label class="control-label col-lg-3" for="fname">First Name</label>
			<div class="col-lg-8">
				<input class="form-control" type="text" name="fname" id="fname" placeholder="First Name" required>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-lg-3" for="email">Email</label>
			<div class="col-lg-8">
				<input class="form-control" type="email" id="email" name="email" placeholder="Email">
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-lg-3" for="dob">Date of Birth</label>
			<div class="col-lg-8">
				<input class="form-control" type="text" id="dob" name="dob" placeholder="DOB" autocomplete="off">
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-lg-3" for="phone">Phone</label>
			<div class="col-lg-8">
				<input class="form-control" type="text" id="phone" name="phone" placeholder="Phone" autocomplete="off">
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-lg-3" for="mobile">Mobile</label>
			<div class="col-lg-8">
				<input class="form-control" type="text" id="mobile" name="mobile" placeholder="Mobile" autocomplete="off">
			</div>
		</div>
	</div>
	<div class="col-lg-6">
		<div class="form-group">
			<label class="control-label col-lg-3" for="lname">Last Name</label>
			<div class="col-lg-8">
				<input class="form-control" type="text" id="lname" name="lname" placeholder="Last Name">
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-lg-3" for="sex">Gender</label>
			<div class="col-lg-8">
				<div class="btn-group" data-toggle="buttons" data-toggle-name="gender">
					<button type="button" name="male" value="M" class="btn">Male</button>
					<button type="button" name="female" value="F" class="btn">Female</button>
				</div>
				<input type="hidden" id="gender" name="gender" value=""/>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-lg-3" for="address">Address</label>
			<div class="col-lg-8">
				<textarea class="form-control" id="address" name="address" required></textarea>
			</div>
		</div>
	</div>
	<div class="row">
		<fieldset class="col-lg-12">
			<legend>Medical History</legend>
			<div class="col-lg-6">
				<c:forEach var="q" items="${medicalHistoryQuestions}" end="4">
					<c:set var="isCheckBox" value="${q.isCheckBox}"/>
					<c:set var="isText" value="${q.isText}"/>
					<c:if test="${isCheckBox == true}">					
						<div class="form-group">
							<label class="control-label col-lg-5" for=""><c:out value="${q.question}"/></label>
							<div class="col-lg-1">
								<input class="form-control pull-left" type="checkbox" id="${q.id}" name="${q.id}" value="true"/>
							</div>												
						</div>   					
					</c:if>
					<c:if test="${isText == true}">
						<div class="form-group">
							<label class="control-label col-lg-3" for=""><c:out value="${q.question}"/></label>
							<div class="col-lg-8">
								<input class="form-control" type="text" id="${q.id}" name="${q.id}"/>
							</div>
						</div>
					</c:if>
				</c:forEach>	
			</div>
			<div class="col-lg-6">
				<c:forEach var="q" items="${medicalHistoryQuestions}" begin="5">
					<c:set var="isCheckBox" value="${q.isCheckBox}"/>
					<c:set var="isText" value="${q.isText}"/>
					<c:if test="${isCheckBox == true}">					
						<div class="form-group">
							<label class="control-label col-lg-5" for=""><c:out value="${q.question}"/></label>
							<div class="col-lg-1">
								<input class="form-control" type="checkbox" id="${q.id}" name="${q.id}" value="true"/>
							</div>
						</div>   					
					</c:if>
					<c:if test="${isText == true}">
						<div class="form-group">
							<label class="control-label col-lg-5" for=""><c:out value="${q.question}"/></label>
							<div class="col-lg-7">
								<input class="form-control" type="text" id="${q.id}" name="${q.id}"/>
							</div>
						</div>
					</c:if>
				</c:forEach>
			</div>
		</fieldset>
	</div>
	<div class="form-group">
		<div class="col-lg-offset-10 col-lg-2">
			<button id="submit" type="submit" class="btn btn-primary ">Save</button>
			<button type="reset" class="btn btn-primary ">Reset</button>
		</div>
		
	</div>
</form>