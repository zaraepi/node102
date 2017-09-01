// http://learnjsdata.com/group_data.html
// https://bl.ocks.org/d3noob/ced1b9b18bd8192d2c898884033b5529
// http://nzdotstat.stats.govt.nz/wbos/Index.aspx

var marginTop = 50;
var marginLeft = 50;
var width = 600;
var height = 400;

// console.log(bla);

d3.csv('TABLECODE2432_Data.csv',
	function(d){
		var parseYear = d3.timeParse('%Y');

		//if(d.EthnicGroup == 'European'){

			return{
				year:parseYear(d.Year),
				// close:parseFloat(d.Close)
				value:parseInt(d.Value),
				ethnic: d.EthnicGroup
		
			};
		// }else if(d.EthnicGroup == 'M§ori'){
		// 	return{
		// 		maoriYear:parseYear(d.Year),
		// 		maoriValue:parseInt(d.Value)
		// 	}

		// }else if(d.EthnicGroup == 'Other'){
		// 	return{
		// 		otherYear:parseYear(d.Year),
		// 		otherValue:parseInt(d.Value)
		// 	}
		// }
	
	},
	function(error,data){

		

		var groupedData = d3.nest()
		  .key(function(d) { return d.ethnic })
		  .entries(data);

		 //console.log(groupedData);

		var minMaxDate = d3.extent(data,function(d){return d.year});
		var xScale = d3.scaleTime().domain(minMaxDate).range([0,width]);

		var minMaxIncome = d3.extent(data,function(d){return d.value});
		var yScale = d3.scaleLinear().domain(minMaxIncome).range([height,0]);

	// console.log(data);

	//create line generator 
	var lineGenEuropean = d3.line()
		.x(function(d){return xScale(d.year)})
		.y(function(d){return yScale(d.value)})

	var lineGenOther = d3.line()
		.x(function(d){return xScale(d.year)})
		.y(function(d){return yScale(d.value)})


	var lineGenMaori = d3.line()
		.x(function(d){return xScale(d.year)})
		.y(function(d){return yScale(d.value)})



	var lineGenTotal = d3.line()
		.x(function(d){return xScale(d.year)})
		.y(function(d){return yScale(d.value)})



	// 	.x(function(d){return xScale(d.euroYear)})
	// 	.y(function(d){return yScale(d.euroValue)})





	//drawing the graph 

	var graph = d3.select('#stock')
		.append('g')
		.attr('transform','translate('+marginLeft+','+marginTop+')');

	graph.append('path')
		.datum(groupedData[0].values)
		.attr('fill','none')
		.attr('stroke', 'blue')
		.attr('stroke-width', '6')
		.attr('d',lineGenEuropean);

	graph.append('path')
		.datum(groupedData[2].values)
		.attr('fill','none')
		.attr('stroke', 'salmon')
		.attr('stroke-width', '6')
		.attr('d',lineGenOther);


	graph.append('path')
		.datum(groupedData[3].values)
		.attr('fill','none')
		.attr('stroke', 'green')
		.attr('stroke-width', '2')
		.attr('d',lineGenMaori);


	graph.append('path')
		.datum(groupedData[1].values)
		.attr('fill','none')
		.attr('stroke', 'green')
		.attr('stroke-width', '6')
		.attr('d',lineGenTotal);




	// //axes
	var yAxisGen = d3.axisLeft(yScale).ticks(4);
	var xAxisGen = d3.axisBottom(xScale).ticks(4);

	graph.append('g')
		.call(yAxisGen);

	graph.append('g')
		.attr('transform','translate(0,'+height+')')
		.call(xAxisGen);

});














