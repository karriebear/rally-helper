export interface Item {
  brand: string;
  product_code: string;
  name: string;
  quantity: number;
  unit: string;
  type: string;
}

export interface Story {
  //initiative: string;
  ref: string;
  ObjectID: number;
  FormattedID: string;
  Name: string;
  //ScheduleState: string;
  //Iteration: string;
/*
  constructor() {
    this.item_code = null;
    this.purchase_date = null;
    this.price = null;
    this.vendor_id = null;
    this.purchase_method = null;
  }*/
}
/*
{
"CreationDate": "2016-09-08T21:20:55.261Z",
"_CreatedAt": "Sep 8, 2016",
"ObjectID": 62620563989, "VersionId": "293",
"Description": "Enhance excel upload to allow greater number of rows per batch than current limit of 10,000.",
"FormattedID": "US4", "LastUpdateDate": "2017-03-29T17:59:55.337Z", "LatestDiscussionAgeInMinutes": null,
"Name": "EPIC: FR.06   Enhance excel upload   ",
"Notes": "",
"Owner": { "_rallyAPIMajor": "2", "_rallyAPIMinor": "0", "_ref": "https://rally1.rallydev.com/slm/webservice/v2.0/user/67510609820", "_refObjectUUID": "f3cc7cad-ac08-40ed-a721-9afa54c48da9", "_refObjectName": "Natalie M", "_type": "User" },
"Project": { "_rallyAPIMajor": "2", "_rallyAPIMinor": "0", "_ref": "https://rally1.rallydev.com/slm/webservice/v2.0/project/102963422348", "_refObjectUUID": "efee2a4c-4eaa-4490-8e65-d9e0c9026ca3", "_refObjectName": "Adjustments/Reporting Team", "_type": "Project" },
"Ready": false,
"Tags": { "_rallyAPIMajor": "2", "_rallyAPIMinor": "0", "_ref": "https://rally1.rallydev.com/slm/webservice/v2.0/HierarchicalRequirement/62620563989/Tags", "_type": "Tag", "_tagsNameArray": [ { "Name": "Batch Process", "_ref": "/tag/89908209336" } ], "Count": 1 }, "LastBuild": null, "LastRun": null, "PassingTestCaseCount": 0,
"ScheduleState": "In-Progress", "ScheduleStatePrefix": "P", "TestCaseCount": 0,
"Package": null, "AcceptedDate": null, "Blocked": false, "BlockedReason": null, "Blocker": null,
"Children": { "_rallyAPIMajor": "2", "_rallyAPIMinor": "0", "_ref": "https://rally1.rallydev.com/slm/webservice/v2.0/HierarchicalRequirement/62620563989/Children", "_type": "HierarchicalRequirement", "Count": 43 },
"DirectChildrenCount": 43, "DragAndDropRank": "O~~~c~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", "HasParent": false,
"InProgressDate": "2016-11-29T15:23:00.258Z",
"Iteration": null, "Parent": null, "PlanEstimate": 8,
"Predecessors": null, "Recycled": false, "Release": null,
"Successors": null, "TaskActualTotal": 0, "TaskEstimateTotal": 294, "TaskRemainingTotal": 35, "TaskStatus": null,
"Tasks": { "_rallyAPIMajor": "2", "_rallyAPIMinor": "0", "_ref": "https://rally1.rallydev.com/slm/webservice/v2.0/HierarchicalRequirement/62620563989/Tasks", "_type": "Task", "Count": 0 },
"Feature": "Enhance the Excel Upload feature to process >1M rows", "c_HighLevelGoal": null, "c_ImplementationTeamLead": "Natalie M",
"c_PlannedIteration": "Sprint 16 (03/15 - 03/28)",
"PortfolioItem": { "_rallyAPIMajor": "2", "_rallyAPIMinor": "0", "_ref": "https://rally1.rallydev.com/slm/webservice/v2.0/portfolioitem/feature/79742785084", "_refObjectUUID": "ba70d74b-ea94-48d3-be78-1d7f64873d73", "_refObjectName": "Enhance the Excel Upload feature to process >1M rows", "_type": "PortfolioItem/Feature" },
"c_SystemofRecord": "SOR Agnostic", "_type": "HierarchicalRequirement", "beginSprint": null, "endSprint": null, "initiative": "Eagle Integration (PT & SL)"
*/
