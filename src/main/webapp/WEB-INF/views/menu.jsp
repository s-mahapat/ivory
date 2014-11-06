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
					<input type="text" class="form-control" ng-model="term"
						placeholder="Search" name="q" id="searchbox" autocomplete="off">
				</div>
			</form>
		</div>
	</nav>


</div>