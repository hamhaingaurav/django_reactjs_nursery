from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from accounts.serializers import UserSignUpSerializer

# Create your views here.


class UserSignUpAPIView(APIView):
    serializer_class = UserSignUpSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            response_data =  {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': serializer.data,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserSignOutAPIView(APIView):
    def post(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
            token_obj = RefreshToken(token)
            token_obj.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)