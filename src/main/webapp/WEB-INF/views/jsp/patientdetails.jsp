<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/models/PatientModel.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/views/PatientDetails.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/lib/moment.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/resources/backgrid/backgrid.min.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/backgrid/backgrid.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/resources/backgrid/backgrid-moment-cell.min.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/backgrid/backgrid-moment-cell.min.js"></script>

<script type="text/javascript">
	var coll = null;
	var _appointmentsView = null;
	$(document).ready(function() {

		var pm = new PatientModel({
			id : "${patientid}"
		});
		var _addressView = new addressView({
			el : $("#address"),
			model : pm
		});
		var _personalInfoView = new personalInfoView({
			el : $("#personalinfo"),
			model : pm
		});
		pm.fetch();

		var patientAppointmentHistoryCollection = Backbone.Collection.extend({
			model : PatientAppointmentHistoryModel,
			url : CONTEXT_PATH + "/patient/appointments/${patientid}"
		});

		coll = new patientAppointmentHistoryCollection();

		_appointmentsView = new patientAppointMentHistory({
			el : $("#treatment_history_grid"),
			collection : coll
		});

		var _treatmentPlan = new treatmentPlan({
			el : $("#new_treatment_grid"),
			collection : coll
		});		

	});

	function addNewTreatmentRow() {
		appointment = new PatientAppointmentHistoryModel({
			description : '',
			id : 1,
			date : moment().format("DD/MM/YYYY")
		});
		coll.add(appointment);
		appointment.save();
		/*coll.add([{
			description: 'test2',
			id: 1,
			date: '2014-01-24'
		}]);*/
		//_appointmentsView.addrow();
	}
</script>



<div class="row">
	<div class="col-lg-10">
		<div id="user_toolbar" class="pull-right">
			<a href="#" data-toggle="modal" data-target="#treatment_plan_dialog"><span
				class="glyphicon glyphicon-plus-sign blue"></span></a> <a href="#"><span
				class="glyphicon glyphicon-minus-sign blue"></span></a>
		</div>
		<div class="row"></div>
		<div class="">
			<div id="treatment_history_grid" class="ivory-grid"></div>
		</div>
		<div>
			<div id="new_treatment_grid" class="ivory-grid"></div>
		</div>
	</div>
	<div class="col-lg-2">
		<div class="panel panel-primary">
			<div class="panel-heading"></div>
			<div class="panel-body" id="photo"></div>
		</div>
		<div class="panel panel-primary">
			<div class="panel-heading">
				<span class="panel-title">Personal Info</span> <a href="#"
					class="edit-link" title="Edit"><i
					class="glyphicon glyphicon-pencil pull-right"></i></a>
			</div>
			<div class="panel-body" id="personalinfo"></div>
		</div>
		<div class="panel panel-primary">
			<div class="panel-heading">
				<span class="panel-title">Address</span> <a href="#"
					class="edit-link" title="Edit"><i
					class="glyphicon glyphicon-pencil pull-right"></i></a>
			</div>
			<div class="panel-body" id="address"></div>
		</div>
	</div>
</div>
<div class="row">
	<div class="modal fade" id="treatment_plan_dialog" tabindex="-1"
		role="dialog" aria-labelledby="appointmentLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">Treatment Plan
						Details</h4>
				</div>
				<div class="modal-body">
					<form class="form-inline" action="">
						<div class="col-lg-12">
							<div class="form-group">
								<select	class="form-control" id="category">
									<option>Select</option>
									<option>Initial Check up</option>
									<option>Prevention</option>
									<option>Cosmetic</option>
									<option>Crowns</option>
								</select>
							</div>
							<div class="form-group">
								<input class="form-control" type="date"
									id="treatment_start_date" placeholder="Start Date"
									autocomplete="off">
							</div>
							<div class="form-group">
								<input class="form-control" type="date" id="treatment_end_date"
									placeholder="End Date" autocomplete="off">
							</div>
							<div class="form-group">
								<select	class="form-control" id="doctors_name">
									<option>Select</option>								
								</select>
							</div>
						</div>
					</form>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary">Save changes</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->
</div>
