<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<html lang="en" ng-app="ivory">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="shortcut icon"
	href="${pageContext.request.contextPath}/resources/images/favicon.ico"
	type="image/x-icon" />
<title><tiles:getAsString name="title" /></title>
<jsp:include page="jquery.jsp"></jsp:include>
</head>
<body>
	<div id="maindiv" class="container">
		<div id="header">
			<tiles:insertAttribute name="header" />
		</div>
		<div id="menuandsearch">
			<tiles:insertAttribute name="menu" />
		</div>
		<div id="bodydiv" class="row">
			<%--<tiles:insertAttribute name="body" />--%>
			<div ng-view></div>
		</div>
		<div id="statusmessage" class="alert"
			role="alert">
			<span id="alert-text"></span>
		</div>
	</div>
	<div id="footer">
		<tiles:insertAttribute name="footer" />
	</div>
</body>
</html>