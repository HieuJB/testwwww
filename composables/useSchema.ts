export const useSchema = () => {
  const { $t } = useShareCommon();
  const SCHEMA_LIST = {
    LEAGUE: 'league',
    MATCH: 'match',
    PLAYER: 'player',
    COACH: 'coach',
    TEAM: 'team',
    LIVESCORE: 'livescore'
  }
  const schemaLeague = {
    [SCHEMA_LIST.LEAGUE] : {
      "@context": "https://schema.org",
      "@type": "SportsOrganization",
      "sport": "Soccer",
    },
    [SCHEMA_LIST.MATCH] : {
      "@context": "https://schema.org",
      "@type": "SportsEvent",
      "sport": "Soccer",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    },
    [SCHEMA_LIST.PLAYER] : {
      "@context": "https://schema.org",
      "@type": "Person",
    },
    [SCHEMA_LIST.COACH] : {
      "@context": "https://schema.org",
      "@type": "Person",
      "jobTitle": "Head Coach",
    },
    [SCHEMA_LIST.TEAM] : {
      "@context": "https://schema.org",
      "@type": "SportsTeam",
      "sport": "Soccer",
    }
  }

  const cleanObject = (obj:any) => {
    // return Object.fromEntries(
    //     Object.entries(obj).filter(([key, value]) => value !== null && value !== undefined && value !== 0 && value !=='')
    // );
  }  

  const initSchemaMatch = (item:any) => {
    // try {
    //   if(!item) {
    //     return 
    //   }
    //   const { away_team, competition, home_team, match_time, venue_info, id } =
    //     item;

    //   const schema = schemaLeague[SCHEMA_LIST.MATCH];
    //   const updatedSchema = {
    //     ...(home_team?.name &&
    //       away_team?.name && {
    //         name: `${home_team?.name} vs ${away_team?.name}`,
    //       }),
    //     ...(match_time && { startDate: match_time }),
    //     ...(venue_info?.name && {
    //       location: {
    //         '@type': 'SportsActivityLocation',
    //         name: venue_info?.name,
    //         ...(venue_info?.city && {
    //           location: {
    //             '@type': 'PostalAddress',
    //             addressLocality: venue_info.city,
    //           },
    //         }),
    //       },
    //     }),
    //     ...(home_team?.name && {
    //       homeTeam: {
    //         '@type': 'SportsTeam',
    //         name: home_team?.name,
    //         ...(home_team?.id && {
    //           url: `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${
    //             home_team?.id
    //           }`,
    //         }),
    //       },
    //     }),
    //     ...(away_team?.name && {
    //       awayTeam: {
    //         '@type': 'SportsTeam',
    //         name: away_team?.name,
    //         ...(away_team?.id && {
    //           url: `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${
    //             away_team?.id
    //           }`,
    //         }),
    //       },
    //     }),
    //     ...(home_team?.name && away_team?.name && {
    //       'performer': [
    //         {
    //           "@type": "SportsTeam",
    //           "name": `${home_team?.name}`
    //         },
    //         {
    //           "@type": "SportsTeam",
    //           "name": `${home_team?.name}`
    //         }
    //       ]
    //     }),
    //     ...(venue_info?.capacity && {
    //       maximumAttendeeCapacity: venue_info?.capacity
    //     }),
    //     ...(competition?.id && competition?.name && {
    //       "organizer" : {
    //         "@type": "Organization",
    //         "name": `${competition?.name}`,
    //         "url": `${useRequestURL().origin}${ROUTERS_OLD.LEAGUES}/${competition?.id}`,
    //       }
    //     }) 
    //   };
      
    //   const initSchema = Object.assign(schema, updatedSchema);

    //   useHead({
    //     script: [
    //       {
    //         type: 'application/ld+json',
    //         children: JSON.stringify(initSchema),
    //       }
    //     ]
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const initSchemaLeague = (item:any) => {
    // try {
    //   if(!item) {
    //     return 
    //   }
      
    //   const { league, team } = item

    //   const schema = schemaLeague[SCHEMA_LIST.LEAGUE]
    //   const {country_name, country_logo, id, name} = league
      
    //   const menberType = []
    //   if(team) {
    //     for(const value of team) {
    //       const type = {
    //         "@type": "SportsTeam",
    //         "name": value?.team_name,
    //         "url": value?.team_id ? `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${value.team_id}` : '',
    //         "sport": "Soccer",
    //       }
    //       const typeClean = cleanObject(type)
    //       menberType.push(typeClean)
    //     } 
    //   }

    //   const updatedSchema = {
    //     ...(name && { name }),
    //     ...(id && { url: `${useRequestURL().origin}${ROUTERS_OLD.LEAGUES}/${id}` }),
    //     ...(country_logo && { logo: getLiveScoreImage(country_logo, 'competition') }),
    //     ...(country_name && { location: {"@type": "Place", name: country_name }}),
    //     ...(menberType?.length && { member: menberType})
    //   };

    //   const initSchema = Object.assign(schema, updatedSchema);


    //   useHead({
    //     script: [
    //       {
    //         type: 'application/ld+json',
    //         children: JSON.stringify(initSchema),
    //       }
    //     ]
    //   });
    // } catch(e) {
    //   console.log(e);
    // }
  }

  const initSchemaPlayer = (item:any) => {
    // try {
    //   const { player, transfer, honor } = item 

    //   let initHonor: string[] = []
     
    //   if(honor) {
    //     for(const value of Object.keys(honor)) {
    //       if(honor[value]?.[0]) {
    //         initHonor.push(honor[value]?.[0]?.honor?.name)
    //       }
    //     }
    //   }

    //   let oldTeam = null
    //   if(transfer && Array.isArray(transfer)) {
    //     const currentTeam = transfer[transfer.length - 1]
    //     if(currentTeam.from_team_id) {
    //       const nearTeam = transfer.find((item)=> item.to_team_id === currentTeam.from_team_id)
    //       oldTeam = nearTeam
    //     }  
    //   }
      
    //   const schema = schemaLeague[SCHEMA_LIST.PLAYER]
      
    //   const updatedSchema = {
    //     ...(player?.name && { name: player?.name }),
    //     ...(player?.id && { url: `${useRequestURL().origin}${ROUTERS_OLD.PLAYER}${player?.id}` }),
    //     ...(player?.logo_o && { image: getLiveScoreImage(player?.logo_o, 'player') }),
    //     ...(player?.birthday && { birthDate: player?.birthday }),
    //     ...(player?.country?.name && { nationality: player?.country?.name }),
    //     ...(player?.height && { height: {
    //       "@type": "QuantitativeValue",
    //       "value": player?.height,
    //       "unitText": "cm"
    //     }}),
    //     ...(player?.weight && { weight: {
    //       "@type": "QuantitativeValue",
    //       "value": player?.weight,
    //       "unitText": "kg"
    //     }}),
    //     ...(player?.position && { jobTitle: $t(`${getPlayerPosition(player?.position)} playertech`)}),
    //     ...(player?.team?.id && player?.team?.name && { affiliation : 
    //       { "@type": "SportsTeam", 
    //         "name": player?.team?.name,
    //         "url": `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${player?.team?.id}`,
    //         "sport": "Soccer",
    //       }}),
    //     ...(initHonor.length && { awards: initHonor}),
    //     ...(oldTeam?.to_team_name && oldTeam?.to_team_id && {alumniOf: {
    //       "@type": "SportsTeam",
    //       "name": oldTeam?.to_team_name,
    //       "url": `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${oldTeam?.to_team_id}`,
    //       "sport": "Soccer"
    //     }}),
    //     ...(player?.market_value && player?.market_value_currency && {  netWorth: {
    //       "@type": "MonetaryAmount",
    //       "currency": player?.market_value_currency,
    //       "value": player?.market_value
    //     }}),
    //   };

    //   const initSchema = Object.assign(schema, updatedSchema);
      
    //   useHead({
    //     script: [
    //       {
    //         type: 'application/ld+json',
    //         children: JSON.stringify(initSchema),
    //       }
    //     ]
    //   });
    // } catch(e) {
    //   console.log(e);
    // }
  }
  
  const initSchemaCoach = (item:any) => {
    // try {
    //   const schema = schemaLeague[SCHEMA_LIST.COACH]

    //   const { personalInfo, honor } = item 
    //   const personal = personalInfo?.[0]
      
    //   let initHonor: string[] = []
     
    //   if(honor) {
    //     for(const value of Object.keys(honor)) {
    //       if(honor[value]?.[0]) {
    //         initHonor.push(honor[value]?.[0]?.honor?.name)
    //       }
    //     }
    //   }
      

    //   const updatedSchema = {
    //     ...(personal?.name && { name: personal?.name }),
    //     ...(personal?.id && { url: `${useRequestURL().origin}${ROUTERS_OLD.COACH}/${personal?.id}`}),
    //     ...(personal?.birthday && { birthDate: personal?.birthday}),
    //     ...(personal?.country?.name && { nationality: personal?.country?.name}),
    //     ...(personal?.team?.id && personal?.team?.name && { 
    //       "worksFor": {
    //         "@type": "SportsTeam",
    //         "name": personal?.team?.name,
    //         "url": `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${personal?.team?.id}`
    //       },
    //     ...(initHonor.length && { awards: initHonor}),
    //     }),
    //   }

    //   const initSchema = Object.assign(schema, updatedSchema);
      
    //   useHead({
    //     script: [
    //       {
    //         type: 'application/ld+json',
    //         children: JSON.stringify(initSchema),
    //       }
    //     ]
    //   });
    // } catch (e) {
    //   console.log(e)
    // }
  }
  
  const initSchemaTeam = (item:any) => {
    // try {
    //   const schema = schemaLeague[SCHEMA_LIST.TEAM]

    //   const { honorList, lineUpTeam } = item     

    //   const { players, team_info} = lineUpTeam     

    //   const { team_name,team_website,coach_id,coach_name, venue_location, team_id,country_name,team_logo_o, team_foundation_time, team_national, team_country_logo_o } = team_info
      
      
    //   let initHonor: string[] = []

    //   if(honorList) {
    //     for(const value of Object.keys(honorList)) {
    //       if(honorList[value]?.[0]) {
    //         initHonor.push(honorList[value]?.[0]?.honor?.name)
    //       }
    //     }
    //   }


    //   let playerList: any = []
      
    //   for(const value of players) {
    //     const data = {
    //       "@type": "Person",
    //       "name" : value?.name,
    //       "url": value.id ? `${useRequestURL().origin}${ROUTERS_OLD.PLAYER}${value.id}` : '',
    //       "birthDate": (typeof value?.birthday === "string") ? value?.birthday.slice(0,10) : '',
    //       "nationality": value?.country_name
    //     }
    //     const cleanData = cleanObject(data)
    //     playerList.push(cleanData)
    //   }

    //   const updatedSchema = {
    //     ...(team_name && { name: team_name }),
    //     ...(team_id && { url: `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${team_id}`}),
    //     ...(team_logo_o && { logo: getLiveScoreImage(team_national ? team_country_logo_o : team_logo_o, 'team')}),
    //     ...(team_name && { name: team_name }),
    //     ...(team_foundation_time && { foundingDate: team_foundation_time }),
    //     ...(country_name && {  
    //     "address": {
    //       "@type": "PostalAddress",
    //       "addressCountry": country_name,
    //       ...( venue_location && { addressLocality: venue_location } )
    //     }}),
    //     ...(initHonor?.length && { award: initHonor }),
    //     ...(team_website && {"sameAs": [team_website]}),
    //     ...(coach_id && coach_name && {"coach":{
    //       "@type": "Person",
    //       "name": coach_name,
    //       "url": `${useRequestURL().origin}${ROUTERS_OLD.COACH}/${team_id}`
    //     }}),
    //     ...(playerList?.length && { athlete: playerList })
    //   }
      
    //   const initSchema = Object.assign(schema, updatedSchema);

    //   useHead({
    //     script: [
    //       {
    //         type: 'application/ld+json',
    //         children: JSON.stringify(initSchema),
    //       }
    //     ]
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
  }

  const initSchemaLivescore = (item:any) => {
    // try {
    //   const graph = []
    //   for(const value of item) {
    //     const data: any = {
    //       "@type": "SportsOrganization",
    //       ...(value?.name && {"name": value?.name}),
    //       ...(value?.id && {"url": `${useRequestURL().origin}${ROUTERS_OLD.LEAGUES}/${value.id}`}),
    //       "sport": "Soccer",
    //       "event": []
    //     }
        
    //     for(const event of value.matchs) {
    //       const eventData = {
    //         "@type": "SportsEvent",
    //         "name": `${event.home_team.name} vs ${event.away_team.name}`,
    //         "startDate": event.match_time,
    //         "homeTeam": {
    //           "@type": "SportsTeam",
    //           "name": event.home_team.name,
    //           "url": `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${event.home_team.id}`,
    //         },
    //         "awayTeam": {
    //           "@type": "SportsTeam",
    //           "name": event.away_team.name,
    //           "url": `${useRequestURL().origin}${ROUTERS_OLD.TEAM}${event.away_team.id}`,
    //         },
    //         "eventStatus": "https://schema.org/EventScheduled"
    //       }
          
    //       const cleanEventData = cleanObject(eventData)
          
    //       data['event'].push(cleanEventData)
    //     }
        
    //     graph.push(data)
    //   }

    //   const schema = {
    //     "@context": "https://schema.org",
    //     "@graph": graph
    //   }
      
    //   useHead({
    //     script: [
    //       {
    //         type: 'application/ld+json',
    //         children: JSON.stringify(schema),
    //       }
    //     ]
    //   });
    // } catch(e) {
    //   console.log(e);
    // }
  }


  return {
    SCHEMA_LIST,
    // getSchema,
    initSchemaLeague,
    initSchemaMatch,
    initSchemaPlayer,
    initSchemaCoach,
    initSchemaTeam,
    initSchemaLivescore
  }
}