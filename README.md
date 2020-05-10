# Personal Github Repo Website

A webapp (Quarkus+Angular+Bootstrap) that fetches repositories data from GitHub and displays them on my personal website.

## Design of This Webapp

Quarkus backend fetches repositories data from Github, and stores these data to a DBMS (MySQL). As this webapp doesn't involve any authentication, GitHub will limit the bandwidth used by the IP address. Thus, storing data in the DBMS and routinely updates them will be a better approach. Angular app as the frontend, will be responsible for retrieving data from the Quarkus backend and displaying them properly. Additional functionality that is provided in this webapp, is the comment section.