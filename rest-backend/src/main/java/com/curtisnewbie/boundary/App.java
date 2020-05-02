package com.curtisnewbie.boundary;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import org.eclipse.microprofile.openapi.annotations.servers.Server;

@Server(description = "Backend Server for RESTful Web Services")
@ApplicationPath("/api")
public class App extends Application {
}