import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked }) => {
  const classess = useStyles();
  const isDesktop = useMediaQuery("(min-width: 600px)");

  return (
    <div className={classess.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCVwKdyKkamH7iMFJqRkMVvSLS3YW2UsD8" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          console.log("e", e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
          {places?.map((place, i) => (
              <div 
              className={classess.markerContainer} 
              lat={Number(place.latitude)} 
              lng={Number(place.longitude)}
              key={i}
              >
                  {!isDesktop ? (
                      <LocationOnOutlinedIcon color="primary" fontSize="large" />
                  ) : (
                      <Paper elevation={3} className={classess.paper}>
                          <Typography className={classess.typography} variant="subtitle2" gutterBottom>
                              {place.name}
                          </Typography>
                          <img 
                          className={classess.pointer} 
                          src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                          alt={place.name}
                          />
                          <Rating size="small" value={Number(place.rating)} readOnly />
                          </Paper>
                  )}
            </div>

          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
