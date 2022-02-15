/// <reference types="cypress" />

describe("TripPlanner wizard", () => {
  it("should load the routes page", () => {
    cy.intercept("GET", "https://svc.metrotransit.org/nextripv2/routes", {
      fixture: "routes.json",
    }).as("routes");

    cy.visit("http://localhost:3000/");

    cy.get("[data-testid=route-1-label]").should("be.visible");
  });

  it("should use the filter to search with no results returned", () => {
    cy.get("[data-testid=filter-input]").type("Test");
    cy.get("[data-testid=route-1-label]").should("not.exist");
    cy.get("[data-testid=filter-clear]").click();
  });

  it("should use the filter to search with five results returned", () => {
    cy.get("[data-testid=filter-input]").type("Route");
    cy.get("[data-testid=route-1-label]").should("be.visible");
  });

  it("should select a route and load the directions list", () => {
    cy.intercept("GET", "https://svc.metrotransit.org/nextripv2/directions/1", {
      fixture: "directions.json",
    }).as("directions");

    cy.get('[data-testid="route-1-link"]').click();
  });

  it("should select a direction and load the stops list", () => {
    cy.get("[data-testid=direction-0-name]").should("be.visible");
    cy.get('[data-testid="direction-0-link"]').click();

    cy.intercept("GET", "https://svc.metrotransit.org/nextripv2/stops/1/0", {
      fixture: "stops.json",
    }).as("stops");

    cy.get("[data-testid=stop-1-description]").should("be.visible");
  });

  it("should use the filter to search with no results returned", () => {
    cy.get("[data-testid=filter-input]").type("Test");
    cy.get("[data-testid=stop-1-description]").should("not.exist");
    cy.get("[data-testid=filter-clear]").click();
  });

  it("should use the filter to search with five results returned", () => {
    cy.get("[data-testid=filter-input]").type("Stop");
    cy.get("[data-testid=stop-1-description]").should("be.visible");
  });

  it("should select a stop and load the nextripresult page", () => {
    cy.get('[data-testid="stop-1-link"]').click();

    cy.intercept("GET", "https://svc.metrotransit.org/nextripv2/1/0/1", {
      fixture: "nextripresult.json",
    }).as("nextripresult");

    cy.get("[data-testid='departure-0-text']").should("be.visible");
  });
});

export {};
