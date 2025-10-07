cmake_minimum_required(VERSION 3.22.1)

project("edgeviewer")

find_package(OpenCV REQUIRED)

include_directories(${OpenCV_INCLUDE_DIRS})

add_library(edgeviewer SHARED native-lib.cpp)

target_link_libraries(edgeviewer ${OpenCV_LIBS} android log jnigraphics)