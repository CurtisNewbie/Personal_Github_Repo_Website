// TODO: remove demo data

import { Repository } from "./Repository";
import { Comment } from "./comment";

export const DEMO_DATA: Repository[] = JSON.parse(
  '[{"created_at":"2019-06-26T22:25:14Z[UTC]","description":"Creating a calculator using Javafx","full_name":"CurtisNewbie/Calculator_with_Javafx","id":193985438,"language":"Java","license":{"name":"Apache License 2.0"},"name":"Calculator_with_Javafx","owner":{"avatar_url":"https://avatars0.githubusercontent.com/u/45169791?v=4","html_url":"https://github.com/CurtisNewbie","login":"CurtisNewbie"},"pushed_at":"2020-01-04T19:08:58Z[UTC]","stargazers_count":0,"updated_at":"2020-01-04T19:09:01Z[UTC]"},{"created_at":"2019-07-12T01:35:29Z[UTC]","description":"This is a simple android image encryption program, it is more like a safe box with hashing and encryption.","full_name":"CurtisNewbie/Android_ImageEncrypter","id":196488192,"language":"Java","license":{"name":"Apache License 2.0"},"name":"Android_ImageEncrypter","owner":{"avatar_url":"https://avatars0.githubusercontent.com/u/45169791?v=4","html_url":"https://github.com/CurtisNewbie","login":"CurtisNewbie"},"pushed_at":"2020-04-30T07:12:16Z[UTC]","stargazers_count":1,"updated_at":"2020-04-29T07:49:52Z[UTC]"},{"created_at":"2019-11-15T15:46:53Z[UTC]","description":"TicTacToe that supports multiplayer.","full_name":"CurtisNewbie/MultiplayerTicTacToe","id":221954561,"language":"Java","license":{"name":"MIT License"},"name":"MultiplayerTicTacToe","owner":{"avatar_url":"https://avatars0.githubusercontent.com/u/45169791?v=4","html_url":"https://github.com/CurtisNewbie","login":"CurtisNewbie"},"pushed_at":"2019-11-18T12:35:11Z[UTC]","stargazers_count":0,"updated_at":"2019-11-18T12:35:13Z[UTC]"},{"created_at":"2020-01-23T17:11:29Z[UTC]","description":"Book Store app that consists of a Quarkus backend and two Angular frontends.","full_name":"CurtisNewbie/BookStoreApp","id":235844934,"language":"TypeScript","license":{"name":"Apache License 2.0"},"name":"BookStoreApp","owner":{"avatar_url":"https://avatars0.githubusercontent.com/u/45169791?v=4","html_url":"https://github.com/CurtisNewbie","login":"CurtisNewbie"},"pushed_at":"2020-04-19T07:29:15Z[UTC]","stargazers_count":1,"updated_at":"2020-04-20T15:45:34Z[UTC]"},{"created_at":"2020-02-16T16:07:32Z[UTC]","description":"Simple Quarkus application that authenticates administrators and generate JWTs.","full_name":"CurtisNewbie/JwtDistributionApp","id":240921377,"language":"Java","license":{"name":"Apache License 2.0"},"name":"JwtDistributionApp","owner":{"avatar_url":"https://avatars0.githubusercontent.com/u/45169791?v=4","html_url":"https://github.com/CurtisNewbie","login":"CurtisNewbie"},"pushed_at":"2020-03-09T16:07:33Z[UTC]","stargazers_count":0,"updated_at":"2020-03-09T16:07:35Z[UTC]"},{"created_at":"2020-02-23T20:59:14Z[UTC]","description":"A Quarkus + Angular app that scans, hosts and streams media files to other devices using HTTP protocol.","full_name":"CurtisNewbie/MediaHoster","id":242589804,"language":"Java","license":{"name":"Apache License 2.0"},"name":"MediaHoster","owner":{"avatar_url":"https://avatars0.githubusercontent.com/u/45169791?v=4","html_url":"https://github.com/CurtisNewbie","login":"CurtisNewbie"},"pushed_at":"2020-04-16T14:56:22Z[UTC]","stargazers_count":0,"updated_at":"2020-04-16T14:47:12Z[UTC]"},{"created_at":"2020-03-11T23:47:33Z[UTC]","description":"PDF Elements Extractor powered by PDFBox and JavaFX","full_name":"CurtisNewbie/PDF-Element-Extractor","id":246703080,"language":"Java","license":{"name":"Apache License 2.0"},"name":"PDF-Element-Extractor","owner":{"avatar_url":"https://avatars0.githubusercontent.com/u/45169791?v=4","html_url":"https://github.com/CurtisNewbie","login":"CurtisNewbie"},"pushed_at":"2020-03-15T17:42:10Z[UTC]","stargazers_count":0,"updated_at":"2020-03-16T23:09:04Z[UTC]"},{"created_at":"2020-03-14T16:42:55Z[UTC]","description":"Simple program with a UI that converts media file format using FFMPEG (CLI) ","full_name":"CurtisNewbie/FFMPEG-WITH-UI","id":247314772,"language":"Java","license":{"name":"Apache License 2.0"},"name":"FFMPEG-WITH-UI","owner":{"avatar_url":"https://avatars0.githubusercontent.com/u/45169791?v=4","html_url":"https://github.com/CurtisNewbie","login":"CurtisNewbie"},"pushed_at":"2020-04-16T14:25:03Z[UTC]","stargazers_count":0,"updated_at":"2020-04-16T14:19:54Z[UTC]"},{"created_at":"2020-04-14T06:18:53Z[UTC]","description":"QRCodeGenTool powered by Zxing","full_name":"CurtisNewbie/QRCodeGenTool","id":255526674,"language":"Java","license":{"name":"Apache License 2.0"},"name":"QRCodeGenTool","owner":{"avatar_url":"https://avatars0.githubusercontent.com/u/45169791?v=4","html_url":"https://github.com/CurtisNewbie","login":"CurtisNewbie"},"pushed_at":"2020-04-14T15:04:08Z[UTC]","stargazers_count":0,"updated_at":"2020-04-14T15:04:11Z[UTC]"},{"created_at":"2020-04-19T08:34:08Z[UTC]","description":"Build a Quarkus+Angular+Bootstrap chat app to learn WebSocket","full_name":"CurtisNewbie/ChatApp","id":256951078,"language":"Java","license":{"name":"Apache License 2.0"},"name":"ChatApp","owner":{"avatar_url":"https://avatars0.githubusercontent.com/u/45169791?v=4","html_url":"https://github.com/CurtisNewbie","login":"CurtisNewbie"},"pushed_at":"2020-04-21T06:12:19Z[UTC]","stargazers_count":0,"updated_at":"2020-04-21T06:12:22Z[UTC]"}]',
  (key, value) => {
    if (key.endsWith("at")) {
      // a date string
      return new Date(value.substring(0, value.length - 5));
    } else {
      return value;
    }
  }
);

export const DEMO_COMMENTS: Comment[] = [
  {
    id: 1,
    message: "Hey, Curtis.",
    timestamp: new Date(),
    childComments: [
      {
        id: 3,
        message: "Shut up",
        timestamp: new Date(),
        childComments: [
          {
            id: 4,
            message: "No, you shut up",
            timestamp: new Date(),
            childComments: [
              {
                id: 5,
                message: "You both shut up",
                timestamp: new Date(),
                childComments: [
                  {
                    id: 6,
                    message: "Oh god, don't say anything",
                    timestamp: new Date(),
                    childComments: [
                      {
                        id: 7,
                        message:
                          "Reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                        timestamp: new Date(),
                        childComments: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    message: "LOL",
    timestamp: new Date(),
    childComments: [],
  },
];
