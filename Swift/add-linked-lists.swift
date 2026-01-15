/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init() { self.val = 0; self.next = nil; }
 *     public init(_ val: Int) { self.val = val; self.next = nil; }
 *     public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
 * }
 */
class Solution {
    func addTwoNumbers(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
        var p1: ListNode? = l1;
        var p2: ListNode? = l2;
        var sum1: Int = 0;
        var sum2: Int = 0;
        var str: String = ""
        var head: ListNode?
        let bigSum: Int64
        var i: Int = 1;
        while true {
            if let p1 {
                if (p1.val == 0) {
                    if sum1 != 0 {
                        // i += 1
                    }
                } else {
                    sum1 += i * p1.val
                }
            } 
            if let p2 {
                if (p2.val == 0) {
                    if sum2 != 0 {
                        // i += 1
                    }
                } else {
                    sum2 += i * p2.val
                }
            }
            p1 = p1?.next
            p2 = p2?.next
            i *= 10
            guard let p1 else {
                guard let p2 else {
                    break
                }
                continue
            }
        }
        print(sum1)
        print(sum2)
        
        bigSum = Int64(sum1) + Int64(sum2)
        print(bigSum)
        if (bigSum == 0) {
            return ListNode(0)
        }
        print(bigSum)
        var n = bigSum
        let dummy = ListNode()
        var current: ListNode? = dummy
        while n > 0 {
            let new: ListNode? = ListNode(Int(n % 10))
            current?.next = new
            current = new
            n /= 10
            print("n is \(n)")
            print("digit is \(n % 10)")
        }
        head = dummy.next
        print("The head is pointing to \(head?.next?.val)")
        return head;
    }
}