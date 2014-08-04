<!-- <script type="text/template" id="templ_registration">
	<%@include file="../templates/registration_tmpl.jsp"%>
</script>

<div id="registration_container"></div>

<script type="text/javascript">
	registrationView = Backbone.View.extend({
		initialize : function() {
			this.render();
		},
		render : function() {
			// Compile the template using underscore 
			var template = _.template($("#templ_registration").html(), {}); // Load the compiled HTML into the Backbone "el" 
			this.$el.html(template);
			return this;
		},
		events : {
			"click #submit" : "SubmitForm", // call the SubmitForm function defined below
		},
		SubmitForm : function() {
			// check if the gender is selected
			if ($("#gender").val() == "") {
				errorMessage("Please select the gender");
				return false;
			}		
		}
	});
	
	// create the view
	var search_view = new registrationView({el : $("#registration_container")});

	$(document).ready(function() {
		$('#dob').datepicker({
			format : 'dd/mm/yyyy',
			onRender : function(date) {
				return date.valueOf() > new Date() ? 'disabled' : '';
			}
		});

		$(function() {
			$('div.btn-group[data-toggle-name]').each(function() {
				var group = $(this);
				//var form = group.parents('form').eq(0);
				var name = group.attr('data-toggle-name');
				//var hidden = $('input[name="' + name + '"]', form);
				var hidden = $('input[name="' + name + '"]');
				$('button', group).each(function() {
					var button = $(this);
					button.bind('click', function() {
						$(".btn-group button").removeClass('btn-info');
						hidden.val($(this).val());
						button.addClass('btn-info');
					});

				});
			});
		});


	});
</script>
 -->

