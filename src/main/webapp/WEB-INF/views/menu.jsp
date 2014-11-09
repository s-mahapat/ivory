<div class="">
	<nav class="navbar navbar-default" role="navigation">
		<div class="navbar-header">
			<a class="navbar-brand" href="/ivory">Ivory</a>
		</div>
		<div class="collapse navbar-collapse">
			<ul class="nav navbar-nav">
				<li class="dropdown"><a href="javascript:void(0)"
					class="dropdown-toggle" data-toggle="dropdown"><strong>Registration</strong>
						<span class="caret"></span></a>
					<ul class="dropdown-menu" role="menu">
						<li><a tabindex="-1" href="#/registration/patient">Patient</a></li>
						<li class="divider"></li>
						<li><a tabindex="-1" href="#/registration/doctor">Doctor</a></li>
					</ul></li>
			</ul>
			<form class="navbar-form navbar-right" ng-submit="submit()"
				ng-controller="SearchController" role="search" name="search">
				<div class="form-group">
					<input type="text" class="form-control input-sm" ng-model="term"
						placeholder="Search" name="q" id="searchbox" autocomplete="off">
				</div>
				<div class="btn-group">
				  <button title="Patient" ng-click="setSearchOption(1)" type="button" class="btn btn-sm" ng-class="{'btn-default':!searchPatient, 'btn-primary':searchPatient}">
				  	<span><img src="resources/images/patient.png"></span>
				  </button>
				  <button title="Doctor" ng-click="setSearchOption(2)" type="button" class="btn btn-sm" ng-class="{'btn-default':searchPatient, 'btn-primary':!searchPatient}">
				  	<span><img src="resources/images/doctor.png"></span>
				  </button>
				</div>
			</form>
		</div>
	</nav>


</div>