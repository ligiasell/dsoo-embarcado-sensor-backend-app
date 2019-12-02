//
//  ViewController.swift
//  dsoo
//
//  Created by Pedro Freddi on 30/11/19.
//  Copyright © 2019 Pedro Freddi. All rights reserved.
//

import UIKit
import Alamofire
import MBProgressHUD

class ViewController: UIViewController {

    // MARK: - IBActions

    @IBAction func didTapRefresh(_ sender: Any) {
        let loading = MBProgressHUD.showAdded(to: self.view, animated: true)
        loading.label.text = "Loading records"
        getRecords()
    }

    // MARK: - IBOutlets

    @IBOutlet weak var tableView: UITableView!

    // MARK: - Properties

    let URL = "http://192.168.43.142:8081/records"
    var records = [Record]() {
        didSet {
            tableView.reloadData()
        }
    }

    // MARK: - Lifecycle

    override func viewDidLoad() {
        super.viewDidLoad()
        let loading = MBProgressHUD.showAdded(to: self.view, animated: true)
        loading.label.text = "Loading records"
        getRecords()
        setupTable()
    }

    // MARK: - API Request

    func getRecords() {
        Alamofire.request(URL)
                   .validate(contentType: ["application/json"])
                   .validate(statusCode: 200..<300)
                   .responseJSON { response in
                       switch response.result {
                       case .success:
                           guard response.data != nil, let dataJSON = response.data else {
                               print("Error while get content")
                               return self.showAlert(title: "Error", message: "Not possible fetch data")
                           }
                           let decoder = JSONDecoder()
                           do {
                               let data = try decoder.decode([Record].self, from: dataJSON)
                            print(data)
                            self.records = data
                            MBProgressHUD.hide(for: self.view, animated: true)
                           } catch {
                               print(error)
                           }
                       case let .failure(error):
                           print(error)
                           self.showAlert(title: "Error", message: "Try Again Later")
                           MBProgressHUD.hide(for: self.view, animated: true)
                       }
               }
    }

    // MARK: - Private

    private func setupTable() {
        tableView.dataSource = self
    }

    private func showAlert(title: String, message: String) {
        let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
        let alertAction = UIAlertAction(title: "OK", style: .default, handler: nil)
        alert.addAction(alertAction)
        self.present(alert, animated: true, completion: nil)
    }

    private func configureText(for cell: UITableViewCell, with item: Record) {
          if let label = cell.viewWithTag(1) as? UILabel {
            label.text = String(item.record)
          }
      }
}

extension ViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "RecordItem", for: indexPath)
              let item = records[indexPath.row]
              configureText(for: cell, with: item)
              return cell
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return records.count
    }
}
