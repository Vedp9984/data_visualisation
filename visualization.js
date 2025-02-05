// Sample dataset (replace with actual data)
const breedData = [
  { class: "Puppy Dog", breed: "Labrador", participants: 50 },
  { class: "Veteran Dog", breed: "Beagle", participants: 40 },
  { class: "Open Dog", breed: "Labrador", participants: 60 }
];

// Bar Chart
function updateBarChart(breed) {
  let filteredData = breedData.filter(d => d.breed.toLowerCase().includes(breed.toLowerCase()));

  d3.select("#barChart").selectAll("*").remove(); // Clear previous

  let svg = d3.select("#barChart").attr("width", 500).attr("height", 300);
  let x = d3.scaleBand().domain(filteredData.map(d => d.class)).range([0, 400]).padding(0.2);
  let y = d3.scaleLinear().domain([0, d3.max(filteredData, d => d.participants)]).range([200, 0]);

  svg.append("g").attr("transform", "translate(50,200)").call(d3.axisBottom(x));
  svg.append("g").attr("transform", "translate(50,0)").call(d3.axisLeft(y));

  svg.selectAll("rect")
      .data(filteredData)
      .enter().append("rect")
      .attr("x", d => x(d.class) + 50)
      .attr("y", d => y(d.participants))
      .attr("width", x.bandwidth())
      .attr("height", d => 200 - y(d.participants))
      .attr("fill", "steelblue");
}

// Search Input Event
document.getElementById("searchBreed").addEventListener("input", function () {
  updateBarChart(this.value);
});

// Initial Load
updateBarChart("");
// Sample Data (replace with real data)
const heatmapData = [
  { breedGroup: "Toy", gardenSize: "Small", count: 10 },
  { breedGroup: "Working", gardenSize: "Large", count: 15 }
];

// Heatmap
function drawHeatmap() {
  let svg = d3.select("#heatmap").attr("width", 500).attr("height", 300);
  let x = d3.scaleBand().domain(["Toy", "Working"]).range([0, 400]).padding(0.2);
  let y = d3.scaleBand().domain(["Small", "Large"]).range([0, 200]).padding(0.2);
  let colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, 20]);

  svg.append("g").attr("transform", "translate(50,200)").call(d3.axisBottom(x));
  svg.append("g").attr("transform", "translate(50,0)").call(d3.axisLeft(y));

  svg.selectAll("rect")
      .data(heatmapData)
      .enter().append("rect")
      .attr("x", d => x(d.breedGroup) + 50)
      .attr("y", d => y(d.gardenSize))
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .attr("fill", d => colorScale(d.count));
}

// Initial Load
drawHeatmap();
// Sample Data
const lifespanData = {
  "Small": [12, 14, 16, 18, 20],
  "Medium": [10, 12, 14, 16],
  "Large": [8, 10, 12]
};

// Box Plot
function drawBoxPlot() {
  let svg = d3.select("#boxPlot").attr("width", 500).attr("height", 300);
  let x = d3.scaleBand().domain(["Small", "Medium", "Large"]).range([0, 400]).padding(0.2);
  let y = d3.scaleLinear().domain([0, 25]).range([200, 0]);

  svg.append("g").attr("transform", "translate(50,200)").call(d3.axisBottom(x));
  svg.append("g").attr("transform", "translate(50,0)").call(d3.axisLeft(y));

  Object.keys(lifespanData).forEach((size, i) => {
      let vals = lifespanData[size];
      let q1 = d3.quantile(vals, 0.25);
      let median = d3.quantile(vals, 0.5);
      let q3 = d3.quantile(vals, 0.75);
      let min = Math.min(...vals);
      let max = Math.max(...vals);

      let groupX = x(size) + 75;

      svg.append("line").attr("x1", groupX).attr("x2", groupX)
          .attr("y1", y(min)).attr("y2", y(max))
          .attr("stroke", "black");

      svg.append("rect")
          .attr("x", groupX - 10).attr("y", y(q3))
          .attr("width", 20).attr("height", y(q1) - y(q3))
          .attr("fill", "lightblue").attr("stroke", "black");

      svg.append("line").attr("x1", groupX - 10).attr("x2", groupX + 10)
          .attr("y1", y(median)).attr("y2", y(median))
          .attr("stroke", "black");
  });
}

// Initial Load
drawBoxPlot();
