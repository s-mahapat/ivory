<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en" ng-app="ivory">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="shortcut icon"
	href="${pageContext.request.contextPath}/resources/images/favicon.ico"
	type="image/x-icon" />
<title>Ivory</title>
<jsp:include page="jquery.jsp"></jsp:include>
</head>
<body>
	<div id="maindiv" class="container">
		<div id="header">
			<jsp:include page="header.jsp"></jsp:include>
		</div>
		<div id="menuandsearch">
			<jsp:include page="menu.jsp"></jsp:include>
		</div>
		<div id="bodydiv" class="row">
			<div ng-view></div>
		</div>
		<div id="statusmessage" class="alert" ng-class="{'alert-danger': error}"
			role="alert">
			<span id="alert-text"></span>
		</div>
	</div>
	<div id="footer">
		<jsp:include page="footer.jsp"></jsp:include>
	</div>
</body>
</html>