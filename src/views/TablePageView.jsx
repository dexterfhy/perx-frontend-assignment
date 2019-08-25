import React from 'react';

import ReactTable from "react-table";
import 'react-table/react-table.css'

const columnsDesktop = [
  {
    Header: "Image",
    columns: [
      {
	    Header: "Cover",
	    accessor: "attributes.display_properties.image",
		width: 110,
		sortable: false,
		filterable: false,
	    Cell: row => (
				<img src={row.value} alt="Cover Image" />
	   		)
      }	
    ]
  },
  {
    Header: "Book Information",
    columns: [
      {
        Header: "Title",
        accessor: "attributes.content",
    	minWidth: 180
      }	,
      {
        Header: "Type",
        accessor: "attributes.display_properties.type",
    	minWidth: 120,
	      filterMethod: (filter, row) => {
	        if (filter.value === "all") {
	          return true;
	        }
	        if (filter.value === "hard cover") {
	          return row[filter.id] === "Hard cover";
	        }
	        return row[filter.id] === "Soft cover";
	      },
	      Filter: ({ filter, onChange }) =>
	        <select
	          onChange={event => onChange(event.target.value)}
	          style={{ width: "100%" }}
	          value={filter ? filter.value : "all"}
	        >
	          <option value="all">Show All</option>
	          <option value="hard cover">Hard Cover</option>
	          <option value="soft cover">Soft Cover</option>
	        </select>
      }
    ]
  },
  {
    Header: "External Links",
    columns: [
      {
	    Header: "Self",
	    id: "links-self",
    	minWidth: 120,
    	sortable: false,
    	filterable: false,
	    accessor: d => {
	    	return d;
	    },
	    Cell: row => {	    		    	
	    	return (
				<div className="external-links-cell">
					<a href={row.value.links.self} target="_blank"><i className="fas fa-book perx-icons"></i>Title</a>
					<a href={row.value.relationships.authors.links.self} target="_blank"><i className="fas fa-user perx-icons"></i>Author</a>
					<a href={row.value.relationships.publishers.links.self} target="_blank"><i className="fas fa-building perx-icons"></i>Publisher</a>
				</div>
	   		)
   		}
      },
      {
	    Header: "Related",
	    id: "links-related",
    	minWidth: 120,
    	sortable: false,
    	filterable: false,
	    accessor: d => {
	    	return d;
	    },
	    Cell: row => {	    		    	
	    	return (
				<div className="external-links-cell">
					<a href={row.value.relationships.authors.links.related} target="_blank"><i className="fas fa-user perx-icons"></i>Author</a>
					<a href={row.value.relationships.publishers.links.related} target="_blank"><i className="fas fa-building perx-icons"></i>Publisher</a>
				</div>
	   		)
   		}
      }
    ]
  }
];

const columnsTablet = [
  {
    Header: "Image",
    columns: [
      {
	    Header: "Cover",
	    accessor: "attributes.display_properties.image",
		width: 110,
		sortable: false,
		filterable: false,
	    Cell: row => (
				<img src={row.value} alt="Cover Image" />
	   		)
      }	
    ]
  },
  {
    Header: "Book Information",
    columns: [
      {
        Header: "Title",
        accessor: "attributes.content",
    	minWidth: 180
      }	,
      {
        Header: "Type",
        accessor: "attributes.display_properties.type",
    	minWidth: 120,
	      filterMethod: (filter, row) => {
	        if (filter.value === "all") {
	          return true;
	        }
	        if (filter.value === "hard cover") {
	          return row[filter.id] === "Hard cover";
	        }
	        return row[filter.id] === "Soft cover";
	      },
	      Filter: ({ filter, onChange }) =>
	        <select
	          onChange={event => onChange(event.target.value)}
	          style={{ width: "100%" }}
	          value={filter ? filter.value : "all"}
	        >
	          <option value="all">Show All</option>
	          <option value="hard cover">Hard Cover</option>
	          <option value="soft cover">Soft Cover</option>
	        </select>
      }
    ]
  }
];

const columnsMobile = [
  {
    Header: "Book Information",
    columns: [
      {
        Header: "Title",
        accessor: "attributes.content",
    	minWidth: 180
      }	,
      {
        Header: "Type",
        accessor: "attributes.display_properties.type",
    	minWidth: 120,
	      filterMethod: (filter, row) => {
	        if (filter.value === "all") {
	          return true;
	        }
	        if (filter.value === "hard cover") {
	          return row[filter.id] === "Hard cover";
	        }
	        return row[filter.id] === "Soft cover";
	      },
	      Filter: ({ filter, onChange }) =>
	        <select
	          onChange={event => onChange(event.target.value)}
	          style={{ width: "100%" }}
	          value={filter ? filter.value : "all"}
	        >
	          <option value="all">Show All</option>
	          <option value="hard cover">Hard Cover</option>
	          <option value="soft cover">Soft Cover</option>
	        </select>
      }
    ]
  }
];

export default class TablePageView extends React.Component {
	state = {
		data: null,
		currentView: "",
		columns: null,
		loadedData: false,
		errorLoad: ""
	};
	componentDidMount(){
		this.registerListeners();
		this.handleRelayout();

		var API_PATH = "https://perx-frontend-interview.free.beeceptor.com";

	    fetch(API_PATH)
	    .then(res => res.json())
	    .then((data) => {
	      this.setState({
	      	loadedData: true,
	      	data: data.data
	      });
	    })
	    .catch((error) => {
	    	this.setState({
		      	loadedData: true,
		      	errorLoad: error
	    	});
	    });
	}

	registerListeners = () => {
		window.addEventListener("resize", this.handleRelayout);
	};

	handleRelayout = () => {
		var currentWidth = window.innerWidth;

		if (currentWidth >= 1024) {
			this.setState({
				currentView: "desktop",
				columns: columnsDesktop
			});
		} else if (currentWidth > 560) {
			this.setState({
				currentView: "tablet",
				columns: columnsTablet
			});
		} else {
			this.setState({
				currentView: "mobile",
				columns: columnsMobile
			});
		}
	};

	render() {
		//repositions page to include navigation bar
		if (this.state.data == null && this.state.errorLoad == "") window.scrollTo(0, 0);
		return (
			<div className="table-page-container">
				<div className="table-page-text">
					<span className={"is-header table-page-header" + (this.state.currentView == "mobile" ? " is-size-2" : " is-size-1")}>Our Collection</span><br />
					<span className={"is-header" + (this.state.currentView == "mobile" ? " is-size-5" : " is-size-4")}>Vivamus id hendrerit felis. Morbi tincidunt nibh non turpis consequat, tincidunt aliquam lorem vulputate. </span>
		        </div>
		        {this.state.loadedData == true ?
		        	this.state.errorLoad == "" ? 
		        		(
							<ReactTable
					          data={this.state.data}
					          columns={this.state.columns}
					          className=""
							  showPageSizeOptions={false}
							  pageSize={this.state.currentView == "mobile" ? 15 : 5}
							  filterable= {true}
							  multisort={true}
							  defaultFilterMethod= {(filter, row, column) => {
							    const id = filter.pivotId || filter.id
							    return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
							  }}
							  SubComponent=
							  {this.state.currentView != "desktop" ? 
								  row => {
								  	console.log(row);
								    return (
								      <div className="table-page-subcomponent">
								      	{this.state.currentView == "mobile" ? 
								      		(
							      			<div style={{display: 'flex'}}>
									      		<img src={row.original.attributes.display_properties.image} alt="Cover Image" />
										      	<div className="table-page-subcomponent-text">
											      	<span className="is-header is-size-6">External Links</span>
													<div className="external-link-container-mobile">
														<i className="fas fa-book perx-icons"></i>
														<span>
															Title:<br /><a href={row.original.links.self} target="_blank">Self</a>
														</span>
													</div>
													<div className="external-link-container-mobile">
														<i className="fas fa-user perx-icons"></i>
														<span>
															Author:<br /><a href={row.original.relationships.authors.links.self} target="_blank">Self</a> | <a href={row.original.relationships.authors.links.related} target="_blank">Related</a>
														</span>
													</div>
													<div className="external-link-container-mobile">
														<i className="fas fa-building perx-icons"></i>
														<span>
															Publisher:<br /><a href={row.original.relationships.publishers.links.self} target="_blank">Self</a> | <a href={row.original.relationships.publishers.links.related} target="_blank">Related</a>
														</span>
											      	</div>
										      	</div>
									      	</div>
								      		)
								      		:
								      		(
									      	<div className="table-page-subcomponent-text">
										      	<span className="is-header is-size-5">External Links</span>
												<span>
													<i className="fas fa-book perx-icons"></i>Title: <a href={row.original.links.self} target="_blank">Self</a>
												</span>
												<span>
													<i className="fas fa-user perx-icons"></i>Author: <a href={row.original.relationships.authors.links.self} target="_blank">Self</a> | <a href={row.original.relationships.authors.links.related} target="_blank">Related</a>
												</span>
												<span>
													<i className="fas fa-building perx-icons"></i>Publisher: <a href={row.original.relationships.publishers.links.self} target="_blank">Self</a> | <a href={row.original.relationships.publishers.links.related} target="_blank">Related</a>
										      	</span>
									      	</div>
							      			)
								      	}
								      </div>
								    );
								  }
							  	:
							  		""
							  }
					        />
	        			)
		        		:
						(
							<>
								<article class="message is-warning table-page-error-load">
								  <div class="message-header">
								    <p>Error Fetching Data</p>
								  </div>
								  <div class="message-body">
								    There was an error loading the table. Please try again later!<br/><br/>
								    <strong>Error: </strong>{this.state.errorLoad}
								  </div>
								</article>
								<ReactTable
						          data={[]}
						          columns={this.state.columns}
						          className=""
								  showPageSizeOptions={false}
								  pageSize={this.state.currentView == "mobile" ? 15 : 5}
						        />
					        </>
						)
		        	:
		        	null
		        }
	        </div>
	    );
	}
}