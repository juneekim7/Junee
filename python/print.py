A = int(input())
B = int(input())
C = int(input())
num = A*B*C
result = [0]*10

for s in str(num):
    result[int(s)] += 1

for i in range(10):
    print(result[i]) 