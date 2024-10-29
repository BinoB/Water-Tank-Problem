	function fetchArr() {
		const inputArr = document.getElementById("inputArr").value.split(",").map(Number);
		const wallAndWater = getWaterAndWalls(inputArr);
		const onlyWater = getOnlyWater(inputArr);
	  
		createChart(inputArr, wallAndWater, "chart-container");
		createChart(inputArr, onlyWater, "chart-container1");
	  
		document.getElementById("waterunit").innerHTML = `Total Water Units: ${calculateWaterUnits(onlyWater)}`;
	  }
	  
	  function createChart(xData, yData, elementId) {
		const chart = echarts.init(document.getElementById(elementId));
		const options = {
		  xAxis: { type: "category", data: xData },
		  yAxis: { type: "value" },
		  series: [{ data: yData, type: "bar" }],
		};
		chart.setOption(options);
		window.addEventListener("resize", chart.resize);
	  }
	  
	  function calculateWaterUnits(data) {
		return data.reduce((acc, item) => (item.value !== undefined ? acc + item.value : acc), 0);
	  }
	  
	  function getWaterAndWalls(heights) {
		const leftMax = Array(heights.length).fill(0);
		const rightMax = Array(heights.length).fill(0);
		const waterLevels = [];
	  
		for (let i = 1; i < heights.length; i++) leftMax[i] = Math.max(leftMax[i - 1], heights[i - 1]);
		for (let i = heights.length - 2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i + 1], heights[i + 1]);
	  
		heights.forEach((height, i) => {
		  if (height === 0) {
			const waterHeight = Math.min(leftMax[i], rightMax[i]);
			waterLevels.push({ value: waterHeight, itemStyle: { color: "#0000FF" } });
		  } else {
			waterLevels.push({ value: height, itemStyle: { color: "#FFFF00" } });
		  }
		});
	  
		return waterLevels;
	  }
	  
	  function getOnlyWater(heights) {
		const leftMax = Array(heights.length).fill(0);
		const rightMax = Array(heights.length).fill(0);
		const waterOnlyLevels = [];
	  
		for (let i = 1; i < heights.length; i++) leftMax[i] = Math.max(leftMax[i - 1], heights[i - 1]);
		for (let i = heights.length - 2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i + 1], heights[i + 1]);
	  
		heights.forEach((height, i) => {
		  if (height === 0) {
			const waterHeight = Math.min(leftMax[i], rightMax[i]);
			waterOnlyLevels.push({ value: waterHeight, itemStyle: { color: "#0000FF" } });
		  } else {
			waterOnlyLevels.push({ value: 0 });
		  }
		});
	  
		return waterOnlyLevels;
	  }
	  