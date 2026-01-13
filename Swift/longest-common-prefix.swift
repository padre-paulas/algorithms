class Solution {
    func longestCommonPrefix(_ strs: [String]) -> String {
        let matrix = strs.map { Array($0)}
        var comPref: String = "";
        var lastCommon: Bool = false;

        if String(matrix[0]) == "" { return comPref };
        for i in 0..<matrix[0].count {
            if lastCommon { break }
            comPref += String(matrix[0][i]);
            for j in 0..<matrix.count - 1 {
                if matrix[j+1][safe: i] == nil || matrix[j][i] != matrix[j+1][safe: i] {
                    if comPref != "" {
                        comPref.removeLast();
                    }
                    lastCommon = true;
                    break;                   
                }
            }
        }
        return comPref;
    }
}
extension Collection {
    subscript(safe index: Index) -> Element? {
        return indices.contains(index) ? self[index] : nil
    }
}

let solution1 = Solution();
print(solution1.longestCommonPrefix(["flower", "flow", "flag"]))