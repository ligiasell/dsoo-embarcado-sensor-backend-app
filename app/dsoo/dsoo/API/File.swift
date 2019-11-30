////
////  File.swift
////  dsoo
////
////  Created by Pedro Freddi on 30/11/19.
////  Copyright © 2019 Pedro Freddi. All rights reserved.
////
//
//import Foundation
//import Alamofire
//
//final class ChallengesAPIManager {
//    struct FetchChallenges: APIRequestable {
//        typealias APIResponse = ChallengesPage
//        var method: HTTPMethod = .get
//        var parameters: Parameters?
//        var url: String = Constants.Endpoints.challenges
//
//        init(date: Date = Date()) {
//            if date != Date() {
//                let dateFormatter = DateFormatter()
//                dateFormatter.dateFormat = Constants.Date.apiFormat
//                let formattedDate = dateFormatter.string(from: date)
//                parameters = ["date": formattedDate]
//            }
//        }
//    }
//
//    struct CompleteChallenge: APIRequestable {
//        typealias APIResponse = Challenge
//        var method: HTTPMethod = .post
//        var parameters: Parameters?
//        var url: String
//
//        init(id: Int) {
//            url = String(format: Constants.Endpoints.completeChallenge, id)
//        }
//    }
//
//    struct UncompleteChallenge: APIRequestable {
//        typealias APIResponse = Challenge
//        var method: HTTPMethod = .post
//        var parameters: Parameters?
//        var url: String
//
//        init(id: Int) {
//            url = String(format: Constants.Endpoints.uncompleteChallenge, id)
//        }
//    }
//
//    struct SkipChallenge: APIRequestable {
//        typealias APIResponse = Challenge
//        var method: HTTPMethod = .post
//        var parameters: Parameters?
//        var url: String
//
//        init(id: Int) {
//            url = String(format: Constants.Endpoints.skipChallenge, id)
//        }
//    }
//
//    struct UnskipChallenge: APIRequestable{
//        typealias APIResponse = Challenge
//        var method: HTTPMethod = .post
//        var parameters: Parameters?
//        var url: String
//
//        init(id: Int) {
//            url = String(format: Constants.Endpoints.unskipChallenge, id)
//        }
//    }
//}
