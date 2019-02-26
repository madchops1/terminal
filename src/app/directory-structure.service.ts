import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectoryStructureService {

  public directoryStructure: any = [
    { name: "Projects",
      directory: true,
      //background: '/images/karl-beer.jpg',
      children: [
        {
          name: "Dutchess.ai",
          directory: true,
          children: [
            {
              name: "Dutchess.ai",
              url: "https://dutchess.ai"
            },
            {
              name: "White Paper",
              url: "https://s3.amazonaws.com/karlcdn/Dutchess.ai+White+Paper.pdf"
            }
          ]
        },
        { name: "KarlSteltenpohl.com",
          directory: true,
          //background: '/images/karl-disco.jpg',
          children: [
            { name: "Github",
              url: "https://github.com/madchops1/karl-2017"
            },
            {
              name: "readme",
              path: "/files/about.readme.html"
            }
          ]
        },
        { name: "GoReturnMe",
          directory: true,
          children: [
            { name: "GoReturnMe.com",
              directory: false,
              url: "http://goreturnme.com"
            },
            { name: "articles",
              directory: true,
              children: [
                { name: "1st Place RedEye BigIdea Awards 2015",
                  url: "http://www.chicagotribune.com/redeye/redeye-big-idea-awards-winner-kickstarter-20150309-story.html"
                },
                { name: "RedEye",
                  url: "http://www.chicagotribune.com/redeye/redeye-big-idea-event-20141116-023-photo.html"
                },
                { name: "Crain's Chicago Business",
                  url: "http://www.chicagobusiness.com/article/20140902/NEWS07/140909977/a-new-improved-commuter-bike-for-325-well-sort-of"
                },
                { name: "Streetwise",
                  url: "http://chicagoinno.streetwise.co/2015/03/09/lost-and-found-online-startup-goreturnme-rewards-people-for-returning-items/"
                },
                { name: "TruCrowd",
                  url: "http://blog.trucrowd.com/2014/09/the-city-of-big-startups-a-blog-series-on-chicago-startups/"
                }
              ]
            },
            { name: "Instagram",
              url: "https://www.instagram.com/goreturnme/"
            },
            { name: "Facebook",
              url: "https://www.facebook.com/goreturnme/"
            },
            { name: "Kickstarter",
              url: "https://www.kickstarter.com/projects/goreturnme/goreturnme-cloud-based-reward-driven-lost-and-foun/?ref=kicktraq"
            },
            { name: "Twitter",
              url: "https://twitter.com/goreturnme"
            },
            { name: "readme.html",
              path: "/files/goreturnme.readme.html"
            }
          ]
        }, 
        { name: "RobotAndPuppy",
          directory: true,
          children: [
            {
              name: "RobotAndPuppy.com",
              url: "http://robotandpuppy.com",
            },
            {
              name: "Instagram",
              url: "http://instagram.com/robotandpuppy/",
            },
            {
              name: "readme",
              path: "/files/rpcom.readme.html",
            },
            { 
              name: "RobotAndPuppyThreejsLab", 
              url: "http://codepen.io/madchops/pen/GWrvWN" 
            }
            
          ]
        },
        { name: "Tatanka",
          directory: true,
          children: [
            { name: "Documentation", url: "https://tatanka.readme.io/v1.0" },
            { name: "Github", url: "https://github.com/madchops1/tatanka" },
            { name: "readme", path: "/files/tatanka.readme.html" }
          ]
        },
        { name: "allsites.readme",
          path: "/files/allsites.html"
        }
      ]
    },      
    { name: "Labs",
      directory: true,
      //background: '/images/karl-penny.jpg',
      children: [
        { name: "SPA-SitemapGenerator", 
          directory: true,
          children: [
            {
              name: "BotMap.io",
              url: "http://botmap.io"
            },
            {
              name: "readme",
              path: "/files/botmap.readme.html"
            }
          ]
        },
        { name: "AddisonTickets", 
          directory: true,
          children: [
            {
              name: "AddisonTicketsApp",
              url: "https://www.facebook.com/addisontickets/" 
            },
            {
              name: "readme",
              path: "/files/at.readme.html"
            }
          ]
        },
        { name: "FurgMedia", 
          directory: true,
          children: [
            {
              name: "Vimeo",
              url: "https://vimeo.com/user3322509/videos"
            }
          ]
        },
        { name: "RobotAndPuppyLabs",
          directory: true,
          children: [
            {
              name: "RobotAndPuppyThreejsLab", 
              url: "http://codepen.io/madchops/pen/GWrvWN" 
            }
          ]
        },
        { name: "jQueryTour", 
          directory: true,
          children: [
            { name: "Github",
              url: "https://github.com/madchops1/jquerytour"
            },
            { name: "readme", 
              path: "/files/tour.readme.html"
            }
          ]
        }
      ]
    },
    { name: "resume",
      directory: false,
      url: "https://docs.google.com/document/d/1cz2569FN5G4RYnMY7FaOhcpqbF1E6jhAsrGLL0KPplA/edit?usp=sharing"
    },
    { name: "Foosball",
      directory: true,
      children: [
        {
          name: "meetup",
          url: "https://www.meetup.com/Chicago-Foosball/",
        },
        {
          name: "readme",
          path: "/files/meetup.readme.html"
        }
      ]
    },
    { name: "Music",
      directory: true,
      background: "/images/bongo.jpg",
      children: [
        { name: "bongo_parade", url: "https://soundcloud.com/user-948003850" }
      ]
    },
    { name: "Photo-Video",
      directory: true,
      children: [
        { 
          name: "SunriseRider-Photo-Blog", 
          directory: true,
          children: [
            { name: "SunriseRider", url: "http://sunriserider.tumblr.com/" },
            { name: "readme", path: "/files/sunriserider.readme.md" }
          ]
        },
        { name: "Videos",
          directory: true,
          children: [ ]
        }
      ]
    },
    { name: "changelog",
      path: "/files/changelog.html"
    },
    { name: "contact",
      path: "/files/contact.html"
    },
    { name: "readme",
      path: "/files/about.readme.html"
    }
  ];
  
  constructor() { }
}
