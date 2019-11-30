//
//  ViewController.swift
//  dsoo
//
//  Created by Pedro Freddi on 30/11/19.
//  Copyright © 2019 Pedro Freddi. All rights reserved.
//

import UIKit
import Alamofire

class ViewController: UIViewController {

    // MARK: - Properties

    let URL = "http://localhost:8080"

    // MARK: - Lifecycle

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    // MARK: - API Request

    func getRecords() {

        // TODO: Put the correct URL and Entity to decode

        Alamofire.request("\(URL)/today")
                   .validate(contentType: ["application/json"])
                   .validate(statusCode: 200..<300)
                   .responseJSON { response in
                       switch response.result {
                       case .success:
                           guard response.data != nil, let dataJSON = response.data else {
                               print("Error while get content")
                               return self.showAlert()
                           }
                           let decoder = JSONDecoder()
                           do {
                               let data = try decoder.decode(DayForecast.self, from: dataJSON)
                               completion(data)
                           } catch {
                               print(error)
                           }
                       case let .failure(error):
                           print(error)
                           self.setBackgroundGradient(WeatherType.sunny)
                           self.showAlert()
                       }
               }
    }
}

