import math as math
import numpy as np
import sympy as sp
from scipy import optimize
import time

time1 = time.time()
x = sp.Symbol('x')
Kw = np.float64(math.pow(10, -14))
ka1 = np.float64(math.pow(10, -3.128))
ka2 = np.float64(math.pow(10, -4.761))
ka3 = np.float64(math.pow(10, -6.396))
Va = 0.01
Ca = 0.01
Vb = 0.01
Cb = 0.03

# calcu1 = 0


def counter(count):
    for i in range(100):
        count += 1

        # time.sleep(1)
        # print (count)
    return count

# print(counter(0))


def number(*numbers):
    for number in numbers:
        return number


# number(2,3,4,5)


def CALCU():
    # sp.solve(sp.Eq(Kw/h + (Ca*Va)/(Va+Vb)*(math.pow(h,2) *ka1 + 2*h*ka1*ka2 + 3*ka1*ka3*ka2)/(math.pow(h,3) + math.pow(h,2)*ka1 + h*ka1*ka2 + ka1*ka3*ka2) - h - (Cb*Vb)/(Va+Vb),0),h,domain = sp.S.Reals)
    A = sp.solve(sp.Eq(Kw/x + (Ca*Va)/(Va+Vb)*(x*x*ka1 + 2*x*ka1*ka2 + 3*ka1*ka3*ka2) / (x*x *
                 x + x*x*ka1 + x*ka1*ka2 + ka1*ka3*ka2) - x - (Cb*Vb)/(Va+Vb) - x - (Cb*Vb)/(Va+Vb), 0), x)
    # A = sp.solve(sp.Eq((10**(-14))/h + (Ca*Va)/(Va+Vb)*((((h**2) *(10**(-3.128))) + 2*h*(10**(-3.128))*(10**(-4.761)) + 3*(10**(-3.128))*(10**(-6.396))*(10**(-4.761)))/ ((h**3) + ((h**2)*(10**(-3.128))) + h*(10**(-3.128))*(10**(-4.761)) + (10**(-3.128))*(10**(-6.396))*(10**(-4.761)))) - h - (Cb*Vb)/(Va+Vb),0),h)
    B = -sp.log(A[0])
    print(A)
    # calcu1 = A[0]

# CALCU()


def f(Kw, ka1, ka2, ka3, Va, Vb, Ca, Cb, x):
    f = np.float64(Kw/x + (Ca*Va)/(Va+Vb)*((((x*x) * ka1) + 2*x*ka1*ka2 + 3*ka1*ka3*ka2) /
                   ((x*x*x) + ((x*x)*ka1) + x*ka1*ka2 + ka1*ka3*ka2)) - x - (Cb*Vb)/(Va+Vb))
    return f


def r0():
    r0 = optimize.fsolve(f, 0, args=(math.pow(10, -14), math.pow(10, -3.128),
                         math.pow(10, -4.761), math.pow(10, -6.396), 0.01, 0.02, 0.01, 0.03))
    print(r0)

# f = lambda x : Kw/x + (Ca*Va)/(Va+Vb)*(x*x*ka1 + 2*x*ka1*ka2 + 3*ka1*ka3*ka2)/ (x*x*x + x*x*ka1 + x*ka1*ka2 + ka1*ka3*ka2) - x - (Cb*Vb)/(Va+Vb)
# f = lambda x : Kw/x + (Ca*Va)/(Va+Vb)*(x*x*ka1 + 2*x*ka1*ka2 + 3*ka1*ka3*ka2)/ (x*x*x + x*x*ka1 + x*ka1*ka2 + ka1*ka3*ka2) - x - (Cb*Vb)/(Va+Vb)
# r = optimize.fsolve(f,0)

# print(r)
