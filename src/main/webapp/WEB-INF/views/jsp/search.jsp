<link rel="stylesheet" type="text/css"	href="${pageContext.request.contextPath}/resources/bbgrid/bbGrid.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/bbgrid/bbGrid.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/models/SearchModel.js"></script>
<script>
	$(document).ready(function() {		
		var searchResultsClass = Backbone.Collection.extend({
			model: searchModel,
			url: "${pageContext.request.contextPath}/search?q=${searchString}",
		});
		
		var coll = new searchResultsClass();		
		var MyGrid = new bbGrid.View({
			container : $('#searchgrid'),
			autofetch: true,			
			rows: 20,
			rowList: [20, 50,100],
			enableSearch: true,
			collection : coll,
			colModel : [ {title: 'ID', name: 'id', sorttype: 'number', width: '30px'}, 
			             {title: 'First Name', name: 'fname', width: '100px'},
			             {title: 'Last Name', name: 'lname', width: '100px'},
			             {title: 'Address', name: 'address'},
			             {title: 'Email', name: 'email'},
			             {title: 'Mobile', name: 'mobile'},
			],
			onRowClick: function(model){
				$(location).attr('href',"patient/" + model.id);
			}
		});
	});
</script>
<div class="col-lg-12">
	<div  id="searchgrid" style="margin-bottom: 30px;"></div>
</div>
