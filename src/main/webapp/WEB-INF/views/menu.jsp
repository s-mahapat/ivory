<div class="">
	<nav class="col-lg-12 navbar navbar-default" role="navigation">
		<div class="navbar-header">
			<a class="navbar-brand" href="/ivory">Ivory</a>
		</div>
		<div class="collapse navbar-collapse">
			<ul class="nav navbar-nav">
				<li class="dropdown"><a href="javascript:void(0)"
					class="dropdown-toggle" data-toggle="dropdown"><strong>Registration</strong><b
						class="caret"></b></a>
					<ul class="dropdown-menu" role="menu">
						<li><a tabindex="-1" href="#/registration/patient">Patient</a></li>
						<li class="divider"></li>
						<li><a tabindex="-1" href="#/registration/doctor">Doctor</a></li>
					</ul></li>
			</ul>
			<form class="navbar-form navbar-right" ng-submit="submit()"
				ng-controller="PatientSearchController" role="search" name="search">
				<div class="form-group">
<<<<<<< HEAD:src/main/webapp/WEB-INF/views/layouts/menu.jsp
					<input type="text" class="form-control" ng-model="term"
						placeholder="Search Doctor/Patient" name="q" id="searchbox" autocomplete="off">
=======
					<input type="text" class="form-control input-sm" ng-model="term"
						placeholder="Search Patient" name="q" id="searchbox" autocomplete="off">
>>>>>>> master:src/main/webapp/WEB-INF/views/menu.jsp
				</div>
			</form>
		</div>
	</nav>


</div>